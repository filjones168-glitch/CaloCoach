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
- A Supabase/Postgres schema with Row Level Security policies in `supabase/schema.sql`

## Connecting a backend

`NutritionStore` in `app.js` is the local persistence seam. Replace it with Supabase data access while keeping the view layer and `AIService` interface intact. AI image recognition, meal suggestions, daily insights, and coach answers are also grouped in `AIService` so an OpenAI, Gemini, Anthropic, OpenRouter, or local model adapter can be added without coupling provider details to the UI.

The local demo uses realistic sample data and never sends food logs or photos anywhere.
