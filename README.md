# CaloCoach

CaloCoach is a friendly, beginner-first calorie budget and AI nutrition coach MVP. It answers the daily question: **“How many calories do I have left, and what should I eat?”**

## Run locally

This version intentionally has no build dependency or API key. It uses a small local HTTP server and `localStorage` so the core experience works immediately:

```bash
npm run dev
# open http://localhost:4173
```

The prototype includes:

- Responsive Home, Daily diary, AI Coach, Progress, and Profile views
- A transparent Mifflin–St Jeor calorie budget calculation in the profile flow
- Search, food photo estimate review, and quick-add food flows
- Live calorie totals and remaining budget after add, edit, and delete actions
- Weight tracking with a simple trend chart and weekly summary
- Context-aware demo AI Coach responses through the provider-agnostic `AIService`
- Filipino-friendly starter meals and contextual Filipino meal suggestions
- Reset goal and plan flow, plus a persistent working dark mode/light mode toggle
- Mobile bottom navigation, tablet layouts, accessible touch targets, and compact beginner-first cards
- A Supabase/Postgres schema with Row Level Security policies in `supabase/schema.sql`
- Installable PWA support with offline shell caching, app icons, and a phone-sized preview at `/phone-preview.html`

## Connecting a backend

`NutritionStore` in `app.js` is the local persistence seam. Replace it with Supabase data access while keeping the view layer and `AIService` interface intact. AI image recognition, meal suggestions, daily insights, and coach answers are also grouped in `AIService` so an OpenAI, Gemini, Anthropic, OpenRouter, or local model adapter can be added without coupling provider details to the UI.

The local demo uses realistic sample data and never sends food logs or photos anywhere.

## AI provider connection

The UI now sends a selected photo to a real vision adapter when one is configured and validates `isFoodImage`, confidence, item names, portions, and calories before showing editable results. The Coach uses an agent-style system prompt with recent conversation history, current calorie context, meals, goal, Filipino preferences, and allergies. Configure both providers from a secure backend with:

```js
window.CaloCoachAI = {
  model: 'gpt-4o-mini',
  visionEndpoint: '/api/ai/estimate-food',
  coachEndpoint: '/api/ai/coach'
};
```

The vision endpoint should accept multipart form data with an `image` field and return JSON in this shape:

```json
{
  "isFoodImage": true,
  "confidence": 0.86,
  "items": [{"name":"Chicken adobo","portion":"1 cup","calories":380}],
  "total": 380,
  "notes": "Approximate estimate"
}
```

The deployed static demo intentionally does not hardcode an AI key. If no provider is configured, the photo flow clearly explains that it could not confidently analyze the image instead of inventing a meal or silently logging incorrect calories. The local Coach still provides context-aware fallback responses using the user’s budget, meals, goal, Filipino preferences, and allergy note.

### Supabase setup

1. Create or open a Supabase project and copy its **Project URL** from `Project Settings → API`.
2. Put that public URL in `supabase-config.js` as `window.CaloCoachSupabase.url`.
3. In Supabase **Edge Functions → Secrets**, add `OPENAI_API_KEY`, `OPENAI_MODEL` (optional, default `gpt-4o-mini`), `OPENAI_VISION_MODEL` (optional), and `APP_ORIGIN=https://filjones168-glitch.github.io`.
4. Deploy the functions with the Supabase CLI or run the manual GitHub workflow named **Deploy CaloCoach AI functions**. The workflow requires GitHub repository secrets named `SUPABASE_ACCESS_TOKEN` and `SUPABASE_PROJECT_REF`.
5. Refresh the deployed app. The Coach header will change from `Context-aware and ready` to `Model connected` when the endpoint is reachable.

The current functions are configured without JWT verification so this localStorage MVP can call them. Before production use, connect Supabase Auth and change both functions to `verify_jwt = true` in `supabase/config.toml` so only signed-in users can spend AI credits.
