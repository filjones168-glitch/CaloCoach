import { errorResponse, isAllowedOrigin, jsonResponse } from '../_shared/cors.ts';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

function cleanText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function systemPrompt(context: Record<string, unknown>): string {
  const profile = (context.profile || {}) as Record<string, unknown>;
  const preferences = (context.preferences || {}) as Record<string, unknown>;
  const meals = Array.isArray(context.meals) ? context.meals.join(' | ') : 'none logged';
  return `You are CaloCoach, a warm, practical nutrition coach for a beginner. Speak like a thoughtful human, not a robot. Answer the exact question first, then offer one or two realistic next steps. Use short paragraphs and bullets when useful. Never shame food, diagnose illness, recommend crash diets, advise starvation, or tell a user to compensate for eating. Food and calorie values are estimates. If a question needs medical care or suggests an eating disorder, respond safely and recommend a qualified professional.

Use this context, but do not invent facts:
Daily target: ${context.dailyTarget ?? 'unknown'} kcal
Consumed today: ${context.consumed ?? 'unknown'} kcal
Remaining today: ${context.remaining ?? 'unknown'} kcal
Goal: ${profile.goal ?? 'unknown'}
Activity: ${profile.activityLabel ?? 'unknown'}
Cuisine preference: ${preferences.cuisine ?? 'Filipino'}
Allergies: ${preferences.allergies || 'none provided'}
Meals today: ${meals}

The user's food preference is Filipino-friendly. Suggest familiar options such as adobo, tinola, sinigang, rice, pandesal, eggs, bangus, and vegetables when relevant. Ask only one short follow-up question when information is missing.`;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return jsonResponse(request, { ok: true });
  if (!isAllowedOrigin(request)) return errorResponse(request, 'Origin is not allowed.', 403);
  if (request.method !== 'POST') return errorResponse(request, 'Use POST for coach messages.', 405);

  const apiKey = Deno.env.get('OPENAI_API_KEY');
  if (!apiKey) return errorResponse(request, 'The AI provider is not configured yet.', 503);

  try {
    const payload = await request.json();
    const lastMessage = Array.isArray(payload.messages) ? payload.messages[payload.messages.length - 1] : null;
    const question = cleanText(payload.question || lastMessage?.content);
    if (!question) return errorResponse(request, 'A coach question is required.');

    const context = (payload.context || {}) as Record<string, unknown>;
    const history = Array.isArray(payload.history) ? payload.history.slice(-8) : [];
    const messages = [
      { role: 'system', content: systemPrompt(context) },
      ...history.map((message: { role?: string; message?: string; content?: string }) => ({
        role: message.role === 'coach' || message.role === 'assistant' ? 'assistant' : 'user',
        content: cleanText(message.content || message.message).replace(/<[^>]*>/g, ''),
      })).filter((message: { content: string }) => message.content),
      { role: 'user', content: question },
    ];

    const model = Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini';
    const upstream = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature: 0.65, max_tokens: 550 }),
    });
    if (!upstream.ok) {
      console.error('OpenAI coach error', upstream.status, await upstream.text());
      return errorResponse(request, 'The AI coach is temporarily unavailable.', 502);
    }
    const result = await upstream.json();
    const answer = cleanText(result.choices?.[0]?.message?.content);
    if (!answer) return errorResponse(request, 'The AI coach returned an empty response.', 502);
    return jsonResponse(request, { answer, model });
  } catch (error) {
    console.error('Coach function error', error);
    return errorResponse(request, 'The AI coach could not process that message.', 500);
  }
});
