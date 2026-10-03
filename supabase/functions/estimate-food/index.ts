import { errorResponse, isAllowedOrigin, jsonResponse } from '../_shared/cors.ts';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

function extractJson(text: string): Record<string, unknown> {
  const withoutFence = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  const start = withoutFence.indexOf('{');
  const end = withoutFence.lastIndexOf('}');
  if (start < 0 || end < start) throw new Error('The vision model did not return JSON');
  return JSON.parse(withoutFence.slice(start, end + 1));
}

function normaliseResult(raw: Record<string, unknown>): Record<string, unknown> {
  const rawItems = Array.isArray(raw.items) ? raw.items : [];
  const items = rawItems.map((item: Record<string, unknown>) => ({
    name: String(item.name || 'Unknown food').slice(0, 80),
    portion: String(item.portion || 'approximate portion').slice(0, 100),
    calories: Math.max(0, Math.round(Number(item.calories || 0))),
  })).filter((item: { name: string; calories: number }) => item.name && Number.isFinite(item.calories));
  const total = items.reduce((sum: number, item: { calories: number }) => sum + item.calories, 0);
  return {
    isFoodImage: raw.isFoodImage !== false && raw.is_food_image !== false,
    confidence: Math.min(1, Math.max(0, Number(raw.confidence || 0))),
    items,
    total,
    notes: String(raw.notes || 'Approximate AI estimate. Review portions before logging.'),
  };
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return jsonResponse(request, { ok: true });
  if (!isAllowedOrigin(request)) return errorResponse(request, 'Origin is not allowed.', 403);
  if (request.method !== 'POST') return errorResponse(request, 'Use POST for food images.', 405);

  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) return errorResponse(request, 'The AI provider is not configured yet.', 503);

  try {
    const form = await request.formData();
    const image = form.get('image');
    if (!(image instanceof File)) return errorResponse(request, 'Attach an image in the image field.');
    if (!image.type.startsWith('image/')) return errorResponse(request, 'Only image files are supported.');
    if (image.size > MAX_IMAGE_BYTES) return errorResponse(request, 'The image must be smaller than 10 MB.');

    const bytes = new Uint8Array(await image.arrayBuffer());
    let binary = '';
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    const dataUrl = `data:${image.type};base64,${btoa(binary)}`;
    const contextText = String(form.get('context') || '{}');
    const model = Deno.env.get('OPENAI_VISION_MODEL') || Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini';
    const prompt = `Analyze this image as a nutrition assistant. First decide whether it is primarily a food or meal photo. A phone, person, object, screenshot, or unclear image is not food. Never guess food items for a non-food image. For a food image, identify only visible foods, give an approximate portion and estimated calories for each, and return JSON only with this exact shape: {"isFoodImage":true,"confidence":0.0,"items":[{"name":"...","portion":"...","calories":0}],"notes":"..."}. Calories are estimates, not exact. Keep the list short and practical. User context: ${contextText}`;

    const upstream = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, temperature: 0.1, max_tokens: 500, response_format: { type: 'json_object' }, messages: [{ role: 'user', content: [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } }] }] }),
    });
    if (!upstream.ok) {
      console.error('OpenAI vision error', upstream.status, await upstream.text());
      return errorResponse(request, 'The food vision service is temporarily unavailable.', 502);
    }
    const result = await upstream.json();
    const content = result.choices?.[0]?.message?.content;
    if (typeof content !== 'string') return errorResponse(request, 'The vision model returned no result.', 502);
    return jsonResponse(request, normaliseResult(extractJson(content)));
  } catch (error) {
    console.error('Vision function error', error);
    return errorResponse(request, 'The image could not be analyzed safely.', 500);
  }
});
