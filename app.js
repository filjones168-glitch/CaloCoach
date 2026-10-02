/* CaloCoach — a lightweight, modular MVP.
   The UI runs on a local store for this prototype. The store and AIService are intentionally
   separated so they can be swapped for Supabase and an AI provider without changing views. */

const iconPaths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/><path d="M8 21h8"/>',
  'book-open': '<path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h4a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H5a2.5 2.5 0 0 0-2.5 2.5z"/><path d="M21.5 5.5A2.5 2.5 0 0 0 19 3h-4a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h4a2.5 2.5 0 0 1 2.5 2.5z"/>',
  sparkles: '<path d="m12 3-1.2 4.1a2.6 2.6 0 0 1-1.7 1.7L5 10l4.1 1.2a2.6 2.6 0 0 1 1.7 1.7L12 17l1.2-4.1a2.6 2.6 0 0 1 1.7-1.7L19 10l-4.1-1.2a2.6 2.6 0 0 1-1.7-1.7z"/><path d="m19 16-.5 1.7a1.4 1.4 0 0 1-.9.9L16 19l1.6.4a1.4 1.4 0 0 1 .9.9L19 22l.5-1.7a1.4 1.4 0 0 1 .9-.9L22 19l-1.6-.7a1.4 1.4 0 0 1-.9-.9z"/>',
  'trend-up': '<path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/>',
  'user-round': '<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  'settings-2': '<path d="M20 7h-9"/><path d="M14 17H4"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/>',
  'message-circle': '<path d="M20 11.5a8 8 0 0 1-8.5 8 8.4 8.4 0 0 1-3.7-.8L3 20l1.3-4.1A8 8 0 1 1 20 11.5Z"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  'more-horizontal': '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  camera: '<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
  upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  pencil: '<path d="m4 16-.7 4.7L8 20l10.5-10.5a2.1 2.1 0 0 0-3-3Z"/><path d="m13.5 7.5 3 3"/>',
  trash: '<path d="M4 7h16M10 11v5M14 11v5M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  'info-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  'calendar-days': '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  'utensils': '<path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 3 6 0 8"/>',
  'scale': '<path d="M12 3v18M5 21h14M6 8h12l-2 5H8Z"/><path d="M5 5h14"/>',
  'target': '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
  'shield-check': '<path d="M12 21s8-3.5 8-10V5l-8-3-8 3v6c0 6.5 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  'flame': '<path d="M12 22a7 7 0 0 0 7-7c0-4.5-4-6-4-11-2.5 2-4 4-4 6.5 0 1.1-.6 1.7-1.2 2.1C9 11.3 9 10 9.4 8.5 6.8 10.5 5 12.8 5 15a7 7 0 0 0 7 7Z"/>',
  'message-square': '<path d="M20 15a3 3 0 0 1-3 3H8l-5 3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"/>',
  'lightbulb': '<path d="M9 18h6M10 22h4M8 14.5A6 6 0 1 1 16 14c-.8.7-1 1.2-1 2H9c0-.7-.3-1.1-1-1.5Z"/>',
  'award': '<circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9"/>',
  'more-vertical': '<circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
  moon: '<path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/>',
  smartphone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
};

function icon(name, size = 16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.sparkles}</svg>`;
}
function paintIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((node) => {
    const name = node.dataset.icon;
    if (name) node.innerHTML = icon(name, node.dataset.size || 16);
  });
}

const todayKey = new Date().toISOString().slice(0, 10);
const ago = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
};
const formatNumber = (value) => Math.round(Number(value) || 0).toLocaleString('en-US');
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
const initials = (name = '') => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
const dateLabel = (date = new Date(), options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) => new Intl.DateTimeFormat('en-US', options).format(new Date(date));
const shortDate = (date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`));
const timeLabel = () => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date());

const foodCatalog = [
  { id: 'greek-yogurt', name: 'Greek yogurt', calories: 140, serving: '1 cup', emoji: '🥣', protein: 16 },
  { id: 'pandesal-egg', name: 'Pandesal with egg', calories: 300, serving: '2 pandesal + 1 egg', emoji: '🥖', protein: 14 },
  { id: 'chicken-adobo', name: 'Chicken adobo with rice', calories: 370, serving: '1 bowl', emoji: '🍗', protein: 27 },
  { id: 'tinola', name: 'Chicken tinola with rice', calories: 420, serving: '1 bowl', emoji: '🍲', protein: 30 },
  { id: 'sinigang', name: 'Pork sinigang with rice', calories: 510, serving: '1 bowl', emoji: '🥘', protein: 29 },
  { id: 'bangus', name: 'Bangus with tomato rice', calories: 460, serving: '1 plate', emoji: '🐟', protein: 27 },
  { id: 'tuna-sisig', name: 'Tuna sisig rice bowl', calories: 440, serving: '1 bowl', emoji: '🍚', protein: 30 },
  { id: 'oatmeal', name: 'Oatmeal with berries', calories: 290, serving: '1 bowl', emoji: '🥣', protein: 9 },
  { id: 'chicken-breast', name: 'Grilled chicken breast', calories: 165, serving: '100 g', emoji: '🍗', protein: 31 },
  { id: 'rice', name: 'White rice', calories: 205, serving: '1 cup', emoji: '🍚', protein: 4 },
  { id: 'banana', name: 'Banana', calories: 105, serving: '1 medium', emoji: '🍌', protein: 1 },
  { id: 'avocado-toast', name: 'Avocado toast', calories: 270, serving: '1 slice', emoji: '🥑', protein: 7 },
  { id: 'egg', name: 'Egg, fried', calories: 90, serving: '1 large', emoji: '🍳', protein: 6 },
  { id: 'salmon', name: 'Baked salmon', calories: 280, serving: '150 g', emoji: '🐟', protein: 30 },
  { id: 'milk', name: 'Milk', calories: 120, serving: '1 cup', emoji: '🥛', protein: 8 },
  { id: 'protein-bar', name: 'Protein bar', calories: 190, serving: '1 bar', emoji: '🍫', protein: 20 },
];

const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725, extreme: 1.9 };
const paceDeficits = { slow: 250, moderate: 400, faster: 550 };

function getSeedState() {
  return {
    activeView: 'home',
    profile: {
      firstName: 'Alex', age: 29, sex: 'female', height: 168, weight: 78.5,
      heightUnit: 'cm', weightUnit: 'kg', activity: 'moderate', activityLabel: 'Moderately active', goal: 'lose',
      goalWeight: 72, pace: 'moderate', maintenance: 2300, deficit: 400, dailyTarget: 1900,
      diet: 'Filipino-friendly', cuisine: 'Filipino', allergies: '',
    },
    logs: [
      { id: 'seed-1', date: todayKey, meal: 'Breakfast', name: 'Pandesal, egg & tomato', calories: 300, quantity: '1 serving', emoji: '🥖', source: 'search' },
      { id: 'seed-2', date: todayKey, meal: 'Lunch', name: 'Chicken adobo with rice', calories: 300, quantity: '1 bowl · estimated', emoji: '🍗', source: 'search' },
      { id: 'seed-3', date: todayKey, meal: 'Snack', name: 'Banana', calories: 120, quantity: '1 medium', emoji: '🍌', source: 'search' },
    ],
    weights: [
      { id: 'weight-1', date: ago(28), weight: 82.1, unit: 'kg' },
      { id: 'weight-2', date: ago(23), weight: 81.4, unit: 'kg' },
      { id: 'weight-3', date: ago(18), weight: 80.7, unit: 'kg' },
      { id: 'weight-4', date: ago(13), weight: 80.2, unit: 'kg' },
      { id: 'weight-5', date: ago(8), weight: 79.4, unit: 'kg' },
      { id: 'weight-6', date: ago(4), weight: 79.1, unit: 'kg' },
      { id: 'weight-7', date: todayKey, weight: 78.5, unit: 'kg' },
    ],
    favorites: ['pandesal-egg', 'chicken-adobo', 'rice', 'egg', 'banana'],
    coachMessages: [
      { role: 'coach', time: '9:42 AM', message: 'Good morning, Alex! You have <strong>1,180 calories</strong> left today. I’m here whenever you need a simple idea for your next meal.' },
      { role: 'user', time: '9:44 AM', message: 'What should I keep in mind today?' },
      { role: 'coach', time: '9:44 AM', message: 'You’re off to a great start. For your next meal, try pairing a protein with something filling like rice, potatoes, or vegetables. No need to be perfect — just keep it practical and enjoyable.' },
    ],
  };
}

const NutritionStore = {
  key: 'calocoach-state-v1',
  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.key));
      if (saved && saved.profile && saved.logs) return saved;
    } catch (error) { console.info('Starting a fresh CaloCoach session.'); }
    return getSeedState();
  },
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(state)); } catch (error) { /* demo can continue without storage */ }
  },
  todayLogs() { return state.logs.filter((log) => log.date === todayKey); },
  consumed() { return this.todayLogs().reduce((total, log) => total + Number(log.calories || 0), 0); },
  remaining() { return state.profile.dailyTarget - this.consumed(); },
  context() {
    return {
      profile: state.profile,
      dailyTarget: state.profile.dailyTarget,
      consumed: this.consumed(),
      remaining: this.remaining(),
      meals: this.todayLogs().map((log) => `${log.meal}: ${log.name} (${log.calories} kcal)`),
      preferences: { diet: state.profile.diet, cuisine: state.profile.cuisine || 'Filipino', allergies: state.profile.allergies },
    };
  },
};

/* Provider-agnostic AI seam. Replace these deterministic responses with an API call later. */
const AIService = {
  async answerCoachQuestion(question, context) {
    const lower = question.toLowerCase();
    const left = Math.max(0, context.remaining);
    const requestedMatch = lower.match(/(?:under|for|around|about|within)\s*(\d{2,4})\s*(?:cal|calories|kcal)?/);
    const requested = requestedMatch ? Number(requestedMatch[1]) : null;
    const budget = Math.max(150, Math.min(requested || 650, left || requested || 650));
    const isFilipino = /(filipino|adobo|sinigang|tinola|pandesal|rice|ulam)/.test(lower) || context.preferences?.cuisine === 'Filipino';
    if (/(over|went|exceed|too much)/.test(lower)) {
      if (context.remaining < 0) return `You are about <strong>${formatNumber(Math.abs(context.remaining))} calories over</strong> your ${formatNumber(context.dailyTarget)} calorie target today. That is okay. Do not skip meals or compensate — simply return to your normal plan tomorrow.`;
      return `Based on what you logged, you have not gone over. You still have <strong>${formatNumber(context.remaining)} calories remaining</strong> in your ${formatNumber(context.dailyTarget)} calorie plan today.`;
    }
    if (/(egg|eggs)/.test(lower) && /rice/.test(lower)) {
      return `With the eggs and rice you have, make a simple <strong>silog-style bowl</strong>: 2 eggs, ¾ cup rice, tomatoes, and a little soy-vinegar dip. That is about <strong>430 calories</strong>. You still have ${formatNumber(left)} calories remaining today.`;
    }
    if (/(dessert|sweet|treat)/.test(lower)) {
      return `Yes — you can fit dessert. You have <strong>${formatNumber(left)} calories</strong> remaining, so a 150–250 calorie serving works without changing your plan. Enjoy it, then continue normally; food is not “good” or “bad.”`;
    }
    if (/(mcdonald|restaurant|takeout|fast)/.test(lower)) {
      return `Yes, you can include it. You have <strong>${formatNumber(left)} calories</strong> left. Choose one meal you actually want, use the restaurant estimate if available, and stop when satisfied. No compensation workout or skipped meal is needed.`;
    }
    if (/(hungry|eat|dinner|lunch|breakfast|food|meal|suggest|what can)/.test(lower)) {
      const mealWord = /(breakfast|pandesal)/.test(lower) ? 'breakfast' : /(lunch)/.test(lower) ? 'lunch' : /(snack)/.test(lower) ? 'snack' : 'dinner';
      const suggestions = isFilipino
        ? [`Chicken adobo with ¾ cup rice — ~${Math.round(budget * .96)} kcal`, `Chicken tinola with rice — ~${Math.round(budget * .88)} kcal`, `Tuna sisig rice bowl with cucumber — ~${Math.round(budget * .93)} kcal`]
        : [`Chicken rice bowl with vegetables — ~${Math.round(budget * .96)} kcal`, `Egg and avocado toast with fruit — ~${Math.round(budget * .84)} kcal`, `Tuna pasta with a side salad — ~${Math.round(budget * 1.05)} kcal`];
      return `For ${mealWord}, I’d keep it to about <strong>${formatNumber(budget)} calories</strong> so it fits your plan. You have <strong>${formatNumber(left)} calories</strong> left today:<ul>${suggestions.map((item) => `<li>${item}</li>`).join('')}</ul>These are estimates; tell me if you want the exact recipe or a different calorie limit.`;
    }
    return `I can make that specific. Your plan is Filipino-friendly, your target is <strong>${formatNumber(context.dailyTarget)} calories</strong>, and you have <strong>${formatNumber(left)} calories</strong> remaining. Ask me for a meal, a calorie limit, or tell me the ingredients you have.`;
  },
  async generateMealSuggestions(calorieRange = 600, meal = 'Dinner') {
    const factor = Number(calorieRange) || 600;
    return [
      { name: 'Chicken adobo with rice', calories: Math.round(factor * .94), ingredients: 'Chicken, soy sauce, vinegar, garlic, bay leaf, rice, cucumber', prep: 'Simmer the chicken with garlic, vinegar, and soy sauce. Serve with measured rice and fresh cucumber.' },
      { name: 'Tinolang manok bowl', calories: Math.round(factor * .86), ingredients: 'Chicken, ginger, sayote, malunggay or spinach, rice', prep: 'Simmer ginger and chicken in broth, add sayote and greens, then serve with a small scoop of rice.' },
      { name: 'Tuna sisig rice bowl', calories: Math.round(factor * .88), ingredients: 'Tuna, onion, calamansi, chili, rice, cucumber', prep: 'Warm tuna with onion and calamansi, add chili to taste, and serve with rice and cucumber.' },
    ];
  },
  async generateDailyInsight(context) {
    if (context.consumed < 500) return 'You have plenty of calories remaining today. A protein-rich meal next can help you feel satisfied.';
    if (context.remaining < 0) return 'Today is just one day. Be kind to yourself and return to your usual budget tomorrow.';
    return 'You’re pacing nicely today. Keep choosing meals you enjoy and focus on consistency over perfection.';
  },
  async estimateFoodFromImage() {
    return { items: [{ name: 'Rice', calories: 250 }, { name: 'Grilled chicken', calories: 280 }, { name: 'Vegetables', calories: 70 }], total: 600 };
  },
};

let state = NutritionStore.load();
// Keep the demo plan focused on Filipino-friendly food, including sessions persisted by an older build.
state.profile = state.profile || {};
state.profile.lastName = '';
state.profile.diet = 'Filipino-friendly';
state.profile.cuisine = 'Filipino';
if (state.logs?.some((log) => log.id === 'seed-1')) {
  const seedBreakfast = state.logs.find((log) => log.id === 'seed-1');
  const seedLunch = state.logs.find((log) => log.id === 'seed-2');
  if (seedBreakfast) Object.assign(seedBreakfast, { name: 'Pandesal, egg & tomato', calories: 300, quantity: '1 serving', emoji: '🥖' });
  if (seedLunch) Object.assign(seedLunch, { name: 'Chicken adobo with rice', calories: 300, quantity: '1 bowl · estimated', emoji: '🍗' });
}
if (!state.favorites?.length || state.favorites.includes('chicken-breast')) state.favorites = ['pandesal-egg', 'chicken-adobo', 'rice', 'egg', 'banana'];
NutritionStore.save();
let modal = null;
let modalState = {};
let deferredInstallPrompt = null;

function getMealEmoji(meal) {
  return ({ Breakfast: '🍳', Lunch: '🍗', Snack: '🍌', Dinner: '🍽️' })[meal] || '🍽️';
}
function getMeals() {
  const meals = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
  return meals.map((meal) => ({ meal, logs: NutritionStore.todayLogs().filter((log) => log.meal === meal), calories: NutritionStore.todayLogs().filter((log) => log.meal === meal).reduce((sum, log) => sum + Number(log.calories || 0), 0) }));
}
function progressPercent() { return Math.min(100, Math.max(0, Math.round((NutritionStore.consumed() / state.profile.dailyTarget) * 100))); }
function goalProgress() {
  const start = state.weights.length ? state.weights[0].weight : state.profile.weight;
  const current = state.weights.length ? state.weights[state.weights.length - 1].weight : state.profile.weight;
  return Math.min(100, Math.max(0, Math.round(((start - current) / Math.max(.1, start - state.profile.goalWeight)) * 100)));
}
function todayGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
}
function displayName() { return state.profile.firstName || 'there'; }

function renderHome() {
  const consumed = NutritionStore.consumed();
  const remaining = NutritionStore.remaining();
  const meals = getMeals();
  const tip = consumed < 500 ? 'You have plenty of calories left today. Consider adding a protein-rich food to your next meal.' : remaining < 0 ? 'One day does not determine your progress. Return to your usual target tomorrow.' : 'You have enough calories left for a satisfying dinner. Keep it simple and enjoyable.';
  return `
    <div class="page-heading">
      <div><div class="eyebrow">OVERVIEW · FILIPINO-FRIENDLY PLAN</div><h1>${todayGreeting()}, ${escapeHtml(displayName())} <span aria-hidden="true">👋</span></h1><p>Your plan, made simple. Here’s how today is looking.</p></div>
      <div class="page-heading-actions"><button class="secondary-button" data-view="diary"><span data-icon="book-open"></span> View diary</button><button class="primary-button" data-action="open-add-food"><span data-icon="plus"></span> Add food</button></div>
    </div>
    <div class="home-grid">
      <div class="home-primary">
        <section class="budget-card">
          <div class="budget-card-top"><span class="eyebrow">TODAY'S CALORIE BUDGET</span><span class="date-pill">${dateLabel(new Date(), { month: 'short', day: 'numeric' })}</span></div>
          <div class="budget-card-main">
            <div><div class="remaining-label">Calories remaining</div><div class="budget-number">${formatNumber(remaining)} <small>kcal</small></div><div class="budget-subtitle">A flexible guide, not a finish line.</div></div>
            <div class="calorie-ring" style="--progress: ${progressPercent()}%"><div class="ring-content"><strong>${progressPercent()}%</strong><span>used today</span></div></div>
          </div>
          <div class="budget-card-bottom">
            <div class="budget-stat"><span>Consumed</span><strong>${formatNumber(consumed)} <span>/ ${formatNumber(state.profile.dailyTarget)} kcal</span></strong></div>
            <div class="budget-stat"><span>Daily target</span><strong>${formatNumber(state.profile.dailyTarget)} kcal</strong></div>
            <button class="primary-button lime" data-action="open-add-food"><span data-icon="plus"></span> Log food</button>
          </div>
        </section>
        <section class="starter-card card">
          <div class="starter-icon" data-icon="lightbulb"></div><div class="starter-copy"><span class="eyebrow">QUICK START</span><strong>Keep it simple: log your next meal.</strong><p>Check what’s left, then ask Coach if you’re unsure what fits.</p></div><button class="icon-button" data-view="coach" aria-label="Open Coach"><span data-icon="arrow-up-right"></span></button>
        </section>
        <section class="card meals-card">
          <div class="card-header"><span class="card-title">Today's meals</span><span class="date-note">${formatNumber(meals.filter((meal) => meal.logs.length).length)} logged</span></div>
          <div class="meal-list">
            ${meals.map((item) => item.logs.length ? `<div class="meal-section"><div class="meal-row"><div class="meal-emoji">${getMealEmoji(item.meal)}</div><div class="meal-copy"><strong>${item.meal}</strong><span>${item.logs.map((log) => escapeHtml(log.name)).join(' · ')}</span></div><div class="meal-cal">${formatNumber(item.calories)} <em>kcal</em></div><button class="icon-button meal-more" aria-label="Open diary" data-view="diary"><span data-icon="more-horizontal"></span></button></div></div>` : `<div class="meal-section"><div class="empty-meal"><div class="meal-copy"><strong>${item.meal}</strong><span>Not logged yet</span></div><button class="add-meal-row" data-action="open-add-food" data-meal="${item.meal}"><span data-icon="plus"></span> Add ${item.meal.toLowerCase()}</button></div></div>`).join('')}
          </div>
        </section>
      </div>
      <div class="home-secondary">
        <section class="coach-card">
          <div class="card-kicker"><span class="coach-kicker-icon" data-icon="sparkles"></span> Your AI nutrition coach</div>
          <h2>What would you like help with today?</h2>
          <form class="coach-question" data-form="quick-coach"><input name="question" placeholder="e.g. What can I eat for dinner?" aria-label="Ask your coach" /><button aria-label="Ask coach"><span data-icon="arrow-up-right"></span></button></form>
          <div class="coach-prompts"><button data-coach-prompt="I'm hungry">I’m hungry</button><button data-coach-prompt="What can I eat for 400 calories?">Under 400 kcal</button><button data-coach-prompt="Give me a Filipino dinner under 600 calories">Filipino dinner</button></div>
        </section>
        <section class="card insight-card"><div class="insight-head"><span class="sparkle" data-icon="sparkles"></span> TODAY'S COACH TIP</div><p>${tip}</p></section>
        <section class="card progress-mini"><div class="progress-head"><div><span class="eyebrow">WEIGHT PROGRESS</span><p>Moving at your pace</p></div><strong>${formatNumber(state.profile.goalWeight)} <small>kg goal</small></strong></div><div class="progress-track"><div class="progress-fill" style="width: ${goalProgress()}%"></div></div><div class="progress-labels"><span>${state.weights.length ? state.weights[state.weights.length - 1].weight.toFixed(1) : state.profile.weight} kg now</span><span>${goalProgress()}% there</span></div></section>
      </div>
    </div>`;
}

function renderSummaryStrip() {
  const consumed = NutritionStore.consumed();
  const remaining = NutritionStore.remaining();
  return `<section class="card summary-strip"><div class="summary-main"><span>CALORIES REMAINING</span><strong>${formatNumber(remaining)} <small>kcal</small></strong><div class="summary-progress"><div style="width:${progressPercent()}%"></div></div></div><div class="summary-metrics"><div class="summary-metric"><span>Consumed</span><strong>${formatNumber(consumed)} kcal</strong></div><div class="summary-metric"><span>Daily target</span><strong>${formatNumber(state.profile.dailyTarget)} kcal</strong></div><div class="summary-metric"><span>Meals logged</span><strong>${NutritionStore.todayLogs().length} / 4</strong></div></div></section>`;
}
function renderDiary() {
  const meals = getMeals();
  return `<div class="page-heading"><div><div class="eyebrow">YOUR FOOD LOG</div><h1>Daily diary</h1><p>Nothing to weigh perfectly — just keep a helpful record.</p></div><div class="page-heading-actions"><button class="primary-button" data-action="open-add-food"><span data-icon="plus"></span> Add food</button></div></div>${renderSummaryStrip()}<div class="diary-layout"><section class="card diary-card"><div class="card-header"><span class="card-title">Food diary</span><button class="icon-button" aria-label="Choose date"><span data-icon="calendar-days"></span></button></div><div class="date-navigator"><button class="date-arrow" aria-label="Previous day"><span data-icon="arrow-left"></span></button><span class="selected-date">Today · ${dateLabel(new Date(), { month: 'long', day: 'numeric' })}</span><button class="date-arrow" aria-label="Next day"><span data-icon="arrow-right"></span></button></div>${meals.map((meal) => `<div class="diary-section"><div class="diary-section-header"><div class="diary-section-title"><span class="meal-dot ${meal.meal.toLowerCase()}"></span>${meal.meal}</div><span class="section-cal">${meal.logs.length ? formatNumber(meal.calories) + ' kcal' : '—'}</span></div>${meal.logs.length ? meal.logs.map((log) => `<div class="diary-food-row"><div class="food-thumb">${log.emoji || '🍽️'}</div><div class="diary-food-copy"><strong>${escapeHtml(log.name)}</strong><span>${escapeHtml(log.quantity || '1 serving')} · ${log.source === 'ai_photo' ? 'AI estimate' : log.source === 'quick_add' ? 'Quick add' : 'Logged manually'}</span></div><div class="diary-food-cal">${formatNumber(log.calories)} kcal</div><div class="food-row-actions"><button class="icon-button" aria-label="Edit ${escapeHtml(log.name)}" data-action="edit-log" data-log-id="${log.id}"><span data-icon="pencil"></span></button><button class="icon-button" aria-label="Delete ${escapeHtml(log.name)}" data-action="delete-log" data-log-id="${log.id}"><span data-icon="trash"></span></button></div></div>`).join('') : `<div class="diary-empty"><span>You haven't logged anything here yet.</span><button class="text-button" data-action="open-add-food" data-meal="${meal.meal}">Add ${meal.meal.toLowerCase()} <span data-icon="plus"></span></button></div>`}</div>`).join('')}</section><div class="home-secondary"><section class="card daily-note"><h3>Make your budget work for you</h3><div class="daily-note-row"><div class="daily-note-icon" data-icon="lightbulb"></div><p>There’s no need to save every calorie. A satisfying meal now can make the rest of the day easier.</p></div><div class="daily-note-row"><div class="daily-note-icon" data-icon="utensils"></div><p>Estimates are okay. A helpful log is better than a perfect one.</p></div></section><section class="card insight-card"><div class="insight-head"><span class="sparkle" data-icon="sparkles"></span> COACH TIP</div><p>${NutritionStore.consumed() < 500 ? 'Try adding some protein to your next meal so it keeps you satisfied.' : 'Nice work keeping a helpful record today.'}</p></section></div></div>`;
}

function renderCoachMessage(message) {
  const body = message.role === 'user' ? escapeHtml(message.message) : message.message;
  return `<div class="message ${message.role === 'user' ? 'user' : ''}">${message.role === 'coach' ? `<div class="coach-avatar" style="width:24px;height:24px;border-radius:8px;flex:0 0 auto">${icon('sparkles', 12)}</div>` : ''}<div class="message-bubble">${body}</div><span class="message-time">${escapeHtml(message.time || '')}</span></div>`;
}
function renderCoach() {
  const context = NutritionStore.context();
  return `<div class="page-heading"><div><div class="eyebrow">PERSONAL SUPPORT</div><h1>Ask your AI Coach</h1><p>Practical ideas that fit your day, your budget, and your life.</p></div></div><div class="coach-layout"><section class="card chat-card"><div class="chat-header"><div class="coach-identity"><div class="coach-avatar">${icon('sparkles', 19)}</div><div><strong>CaloCoach</strong><span><i class="online-dot"></i>Ready to help</span></div></div><span class="chat-date">Your private space</span></div><div class="chat-messages"><div class="chat-day">TODAY</div>${state.coachMessages.map(renderCoachMessage).join('')}</div><form class="chat-composer" data-form="coach-chat"><div class="composer-box"><textarea name="question" rows="1" placeholder="Ask anything about your next meal…" aria-label="Message your AI coach"></textarea><button class="send-button" aria-label="Send message"><span data-icon="arrow-up-right"></span></button></div><div class="composer-hints"><button type="button" data-coach-prompt="What should I eat for dinner?">Dinner ideas</button><button type="button" data-coach-prompt="I'm hungry">I’m hungry</button><button type="button" data-coach-prompt="Can I have dessert?">Dessert</button><button type="button" data-coach-prompt="I only have eggs and rice at home">Use what I have</button></div></form></section><aside class="coach-context"><section class="card context-card"><h3>Today’s context</h3><div class="context-budget"><div><span>Calories remaining</span><strong>${formatNumber(context.remaining)} <small>kcal</small></strong></div><div class="mini-ring"></div></div><div class="context-list"><div class="context-list-row"><span>Daily target</span><strong>${formatNumber(context.dailyTarget)} kcal</strong></div><div class="context-list-row"><span>Consumed</span><strong>${formatNumber(context.consumed)} kcal</strong></div><div class="context-list-row"><span>Goal</span><strong>${state.profile.goal === 'lose' ? 'Lose weight' : 'Maintain'}</strong></div><div class="context-list-row"><span>Activity</span><strong>${escapeHtml(state.profile.activityLabel)}</strong></div></div></section><section class="card prompt-card"><h3>Try asking…</h3><div class="prompt-list"><button data-coach-prompt="What can I eat for 400 calories?">Something under 400 calories <span data-icon="arrow-up-right"></span></button><button data-coach-prompt="Give me a Filipino dinner under 600 calories">A simple dinner idea <span data-icon="arrow-up-right"></span></button><button data-coach-prompt="I went over my calories today">I went over today <span data-icon="arrow-up-right"></span></button></div><button class="secondary-button full-button" data-action="open-suggestions"><span data-icon="utensils"></span> Build a meal idea</button></section><div class="coach-safety"><span data-icon="shield-check"></span><span>Coach suggestions are estimates, not medical advice. Your needs can vary.</span></div></aside></div>`;
}

function chartMarkup() {
  const weights = state.weights.length ? state.weights : [{ date: todayKey, weight: state.profile.weight }];
  const values = weights.map((item) => Number(item.weight));
  const min = Math.min(...values) - .8;
  const max = Math.max(...values) + .8;
  const points = values.map((value, index) => `${(index / Math.max(1, values.length - 1)) * 100},${92 - ((value - min) / (max - min)) * 78}`).join(' ');
  const area = `0,100 ${points} 100,100`;
  const latestIndex = Math.max(0, values.length - 1);
  const latestX = (latestIndex / Math.max(1, values.length - 1)) * 100;
  const latestY = 92 - ((values[latestIndex] - min) / (max - min)) * 78;
  return `<div class="weight-chart"><div class="chart-grid"><span></span><span></span><span></span><span></span></div><svg class="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Weight trend chart"><polygon points="${area}" fill="#e8f3e5" opacity=".8"></polygon><polyline points="${points}" fill="none" stroke="#4c8d5b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></polyline><circle cx="${latestX}" cy="${latestY}" r="2.8" fill="#fff" stroke="#4c8d5b" stroke-width="1.7"></circle></svg><div class="chart-tooltip">${values[latestIndex].toFixed(1)} kg</div><div class="chart-labels"><span>${shortDate(weights[0].date)}</span><span>${shortDate(weights[Math.floor(weights.length / 2)].date)}</span><span>Today</span></div></div>`;
}
function renderProgress() {
  const current = state.weights.length ? state.weights[state.weights.length - 1].weight : state.profile.weight;
  const starting = state.weights.length ? state.weights[0].weight : state.profile.weight;
  const lost = starting - current;
  return `<div class="page-heading"><div><div class="eyebrow">SMALL STEPS, REAL PROGRESS</div><h1>Your progress</h1><p>Notice the trend, not the day-to-day noise.</p></div><div class="page-heading-actions"><button class="primary-button" data-action="open-weight"><span data-icon="plus"></span> Log weight</button></div></div><div class="progress-grid"><section class="card weight-card"><div class="weight-header"><div><div class="eyebrow">CURRENT WEIGHT</div><div class="current-weight">${current.toFixed(1)} <small>kg</small></div><p>Last logged today</p></div><button class="secondary-button" data-action="open-weight"><span data-icon="scale"></span> Update</button></div>${chartMarkup()}<div class="weight-stats"><div class="weight-stat"><span>Starting</span><strong>${starting.toFixed(1)} kg</strong></div><div class="weight-stat"><span>Total progress</span><strong class="positive">${lost >= 0 ? '−' : '+'}${Math.abs(lost).toFixed(1)} kg</strong></div><div class="weight-stat"><span>Goal</span><strong>${Number(state.profile.goalWeight).toFixed(1)} kg</strong></div></div></section><aside class="week-card card"><h3>This week</h3><p>A gentle look at your consistency.</p><div class="week-row"><span>Average calories</span><strong>1,870 / day</strong></div><div class="week-row"><span>Average target</span><strong>${formatNumber(state.profile.dailyTarget)} / day</strong></div><div class="week-row"><span>Days logged</span><strong class="good">6 / 7</strong></div><div class="week-row"><span>Weight change</span><strong class="good">−0.4 kg</strong></div><div class="week-row"><span>Current streak</span><strong>4 days 🔥</strong></div><div class="week-summary"><strong>Coach’s weekly note</strong>You were fairly consistent this week. Keep focusing on consistency rather than perfection.</div></aside><section class="milestone-card card"><div class="milestone-icon" data-icon="award"></div><div><h3>You’re ${goalProgress()}% of the way to your goal</h3><p>That’s ${lost.toFixed(1)} kg down from your starting point. Every logged meal is a useful step.</p></div></section></div>`;
}

function renderProfile() {
  const p = state.profile;
  const current = state.weights.length ? state.weights[state.weights.length - 1].weight : p.weight;
  const favorites = state.favorites.map((id) => foodCatalog.find((food) => food.id === id)).filter(Boolean);
  const deficitLabel = p.deficit > 0 ? `−${formatNumber(p.deficit)}` : p.deficit < 0 ? `+${formatNumber(Math.abs(p.deficit))}` : 'No deficit';
  return `<div class="page-heading"><div><div class="eyebrow">YOUR PLAN</div><h1>My profile</h1><p>Your details help us make the math more personal.</p></div><div class="page-heading-actions"><button class="primary-button" data-action="open-profile-edit"><span data-icon="pencil"></span> Edit profile</button></div></div><div class="profile-grid"><section class="card profile-card"><div class="profile-hero"><div class="avatar profile-avatar">${escapeHtml(initials(p.firstName))}</div><div><h2>${escapeHtml(p.firstName)}</h2><p>Filipino-friendly plan · Member since today</p></div></div><div class="profile-rows"><div class="profile-row"><span>Age</span><strong>${p.age} years old</strong></div><div class="profile-row"><span>Height</span><strong>${p.height} ${p.heightUnit}</strong></div><div class="profile-row"><span>Current weight</span><strong>${Number(current).toFixed(1)} ${p.weightUnit}</strong></div><div class="profile-row"><span>Activity</span><strong>${escapeHtml(p.activityLabel)}</strong></div><div class="profile-row"><span>Goal</span><strong>${p.goal === 'lose' ? 'Lose weight' : p.goal === 'gain' ? 'Gain weight' : 'Maintain weight'}</strong></div><div class="profile-row"><span>Goal weight</span><strong>${p.goalWeight} ${p.weightUnit}</strong></div></div><div class="profile-actions"><button class="secondary-button" data-action="open-profile-edit"><span data-icon="settings-2"></span> Update details</button><button class="secondary-button" data-action="open-plan-reset"><span data-icon="target"></span> Reset goal &amp; plan</button><button class="secondary-button" data-action="install-app"><span data-icon="download"></span> Install app</button><button class="text-button" data-action="reset-demo">Reset demo data</button></div></section><div class="home-secondary"><section class="card calculation-card"><h3>Your daily budget</h3><p>An estimate based on your profile and chosen pace — not a medical prescription.</p><div class="calc-row"><span>Estimated maintenance</span><strong>${formatNumber(p.maintenance)} kcal</strong></div><div class="calc-row"><span>${p.pace === 'slow' ? 'Gentle' : p.pace === 'faster' ? 'Faster' : 'Moderate'} deficit</span><strong>${deficitLabel} kcal</strong></div><div class="calc-result"><span>Daily calorie target</span><strong>${formatNumber(p.dailyTarget)}</strong></div><div class="profile-note"><span data-icon="info-circle"></span><span>We use the Mifflin–St Jeor estimate with an activity multiplier. Individual needs can vary.</span></div></section><section class="card calculation-card"><h3>My foods</h3><p>Save foods you reach for often to make logging faster.</p><div class="favorite-list">${favorites.map((food) => `<div class="favorite-row"><span class="food-thumb">${food.emoji}</span><span>${escapeHtml(food.name)}</span><span class="favorite-actions"><button class="icon-button" data-action="favorite-add" data-food-id="${food.id}" aria-label="Add ${food.name} to diary"><span data-icon="plus"></span></button><button class="icon-button" data-action="favorite-remove" data-food-id="${food.id}" aria-label="Remove ${food.name} from favorites"><span data-icon="trash"></span></button></span></div>`).join('')}</div><button class="secondary-button full-button" data-action="open-add-food"><span data-icon="plus"></span> Add a favorite to diary</button></section></div></div>`;
}

function applyTheme() {
  const dark = localStorage.getItem('calocoach-theme') === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  const iconNode = document.querySelector('[data-theme-icon]');
  const labelNode = document.querySelector('[data-theme-label]');
  if (iconNode) iconNode.innerHTML = icon(dark ? 'sun' : 'moon', 16);
  if (labelNode) labelNode.textContent = dark ? 'Light mode' : 'Dark mode';
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = dark ? '#101713' : '#24543c';
}

function renderView() {
  const root = document.getElementById('view-root');
  const view = state.activeView || 'home';
  root.innerHTML = view === 'home' ? renderHome() : view === 'diary' ? renderDiary() : view === 'coach' ? renderCoach() : view === 'progress' ? renderProgress() : renderProfile();
  document.querySelectorAll('.nav-item, .mobile-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view));
  const todayCount = NutritionStore.todayLogs().length;
  document.getElementById('diary-count').textContent = todayCount;
  document.getElementById('mobile-diary-count').textContent = todayCount;
  document.getElementById('sidebar-name').textContent = state.profile.firstName;
  document.getElementById('topbar-name').textContent = state.profile.firstName;
  const avatarText = initials(state.profile.firstName);
  document.querySelectorAll('.avatar').forEach((avatar) => { if (avatar.id !== 'ignore') avatar.textContent = avatar.classList.contains('profile-avatar') ? avatarText : avatarText.slice(0, 1); });
  paintIcons(document);
  applyTheme();
}

function renderModal() {
  const root = document.getElementById('modal-root');
  if (!modal) { root.innerHTML = ''; return; }
  root.innerHTML = modal === 'add-food' ? addFoodModalTemplate() : modal === 'onboarding' ? onboardingTemplate() : modal === 'suggestions' ? suggestionsModalTemplate() : modal === 'install' ? installModalTemplate() : weightModalTemplate();
  paintIcons(root);
}

function addFoodModalTemplate() {
  const tab = modalState.tab || 'search';
  const search = (modalState.search || '').toLowerCase();
  const matches = foodCatalog.filter((food) => food.name.toLowerCase().includes(search));
  const selected = foodCatalog.find((food) => food.id === modalState.selectedFoodId);
  const isEdit = Boolean(modalState.editLogId);
  let body = '';
  if (tab === 'search') {
    body = `<div class="search-box"><span data-icon="search"></span><input data-modal-input="search" value="${escapeHtml(modalState.search || '')}" placeholder="Search foods, like chicken or rice" aria-label="Search foods" /></div><div class="food-search-list">${matches.length ? matches.map((food) => `<button class="food-option ${selected && selected.id === food.id ? 'selected' : ''}" data-food-id="${food.id}"><span class="food-thumb">${food.emoji}</span><span class="food-option-copy"><strong>${escapeHtml(food.name)}</strong><span>${escapeHtml(food.serving)} · ${food.protein}g protein</span></span><strong>${food.calories} kcal</strong></button>`).join('') : '<div class="diary-empty"><span>No foods found. Try a simpler search.</span></div>'}</div>${selected ? selectedFoodForm(selected) : '<p class="field-help" style="margin-top:14px">Choose a food above to set a portion and meal.</p>'}`;
  } else if (tab === 'quick') {
    body = `<div class="quick-add-hero"><strong>${modalState.quickCalories || '0'} kcal</strong><span>Quick add a number you already know</span></div><div class="form-grid" style="margin-top:16px"><div class="form-field full"><label for="quick-name">What was it?</label><input id="quick-name" data-modal-input="quick-name" value="${escapeHtml(modalState.quickName || '')}" placeholder="e.g. Lunch, homemade meal" /></div><div class="form-field"><label for="quick-calories">Calories</label><input id="quick-calories" data-modal-input="quick-calories" type="number" min="1" max="9999" value="${escapeHtml(modalState.quickCalories || '')}" placeholder="300" /></div><div class="form-field"><label for="quick-meal">Meal</label><select id="quick-meal" data-modal-input="meal"><option ${modalState.meal === 'Breakfast' ? 'selected' : ''}>Breakfast</option><option ${modalState.meal === 'Lunch' ? 'selected' : ''}>Lunch</option><option ${modalState.meal === 'Snack' ? 'selected' : ''}>Snack</option><option ${modalState.meal === 'Dinner' ? 'selected' : ''}>Dinner</option></select></div></div><p class="field-help" style="margin-top:12px">Quick adds are useful when you already have a label or estimate. No need to search.</p>`;
  } else {
    body = modalState.photoAnalyzed ? `<div class="detected-list"><div class="detected-head"><span>Detected foods</span><span class="estimate-tag">AI ESTIMATE</span></div><div class="detected-item"><span>Rice · approximate portion</span><strong>250 kcal</strong></div><div class="detected-item"><span>Grilled chicken · approximate portion</span><strong>280 kcal</strong></div><div class="detected-item"><span>Vegetables · approximate portion</span><strong>70 kcal</strong></div><div class="estimate-total"><span>Estimated total</span><strong>~600 kcal</strong></div></div><div class="form-grid" style="margin-top:14px"><div class="form-field"><label for="photo-meal">Meal</label><select id="photo-meal" data-modal-input="meal"><option>Breakfast</option><option>Lunch</option><option>Snack</option><option selected>Dinner</option></select></div><div class="form-field"><label>Review before adding</label><div class="field-help" style="padding-top:9px">You can edit or remove items after adding.</div></div></div><div class="disclaimer"><span data-icon="info-circle"></span><span>Photo calories are approximate. Please review the foods and portions before adding them to your diary.</span></div>` : `<label class="photo-drop"><div class="upload-icon" data-icon="camera"></div><strong>Drop a food photo here</strong><p>We’ll identify the main foods and give you a helpful estimate.</p><span class="secondary-button"><span data-icon="upload"></span> Choose photo</span><input type="file" accept="image/*" data-photo-input /></label><p class="field-help" style="text-align:center;margin-top:12px">Your photo is only used for this estimate in the demo.</p>`;
  }
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="add-food-title"><div class="modal-head"><div><h2 id="add-food-title">${isEdit ? 'Edit food log' : 'Add food'}</h2><p>${isEdit ? 'Make a quick change and keep moving.' : 'Choose the easiest way for you today.'}</p></div><button class="modal-close" data-action="close-modal" aria-label="Close"><span data-icon="x"></span></button></div><div class="modal-body"><div class="add-tabs"><button class="${tab === 'search' ? 'active' : ''}" data-modal-tab="search"><span data-icon="search"></span> Search</button><button class="${tab === 'photo' ? 'active' : ''}" data-modal-tab="photo"><span data-icon="camera"></span> Food photo</button><button class="${tab === 'quick' ? 'active' : ''}" data-modal-tab="quick"><span data-icon="pencil"></span> Quick add</button></div>${body}</div><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button>${tab === 'photo' && !modalState.photoAnalyzed ? '<button class="primary-button" data-action="analyze-photo">Analyze photo</button>' : `<button class="primary-button" data-action="confirm-add-food" ${tab === 'search' && !selected ? 'disabled style="opacity:.5;cursor:not-allowed"' : ''}>${isEdit ? 'Save changes' : 'Add to diary'} <span data-icon="check-circle"></span></button>`}</div></section></div>`;
}
function selectedFoodForm(food) {
  return `<div class="selected-food"><div class="selected-food-head"><span class="food-thumb">${food.emoji}</span><strong>${escapeHtml(food.name)}</strong><span>${food.calories} kcal / ${escapeHtml(food.serving)}</span></div><div class="quantity-row"><div class="form-field"><label for="food-quantity">Quantity (servings)</label><input id="food-quantity" data-modal-input="quantity" type="number" value="${modalState.quantity || 1}" min=".25" max="20" step=".25" /></div><div class="form-field"><label for="food-meal">Meal</label><select id="food-meal" data-modal-input="meal"><option ${modalState.meal === 'Breakfast' ? 'selected' : ''}>Breakfast</option><option ${modalState.meal === 'Lunch' ? 'selected' : ''}>Lunch</option><option ${modalState.meal === 'Snack' ? 'selected' : ''}>Snack</option><option ${modalState.meal === 'Dinner' ? 'selected' : ''}>Dinner</option></select></div></div><button class="text-button" style="margin-top:11px" data-action="toggle-favorite" data-food-id="${food.id}">${state.favorites.includes(food.id) ? '✓ Saved to My foods' : '+ Save to My foods'}</button></div>`;
}

function onboardingTemplate() {
  const d = modalState.draft;
  const step = modalState.step;
  const activityOptions = [
    ['sedentary', 'Sedentary', 'Little or no exercise', '🪴'], ['light', 'Lightly active', 'Exercise 1–3 days per week', '🚶'], ['moderate', 'Moderately active', 'Exercise 3–5 days per week', '🚲'], ['very', 'Very active', 'Exercise 6–7 days per week', '🏃'], ['extreme', 'Extremely active', 'Hard physical work or intense training', '⚡'],
  ];
  let body = '';
  if (step === 1) {
    const imperial = modalState.unit === 'imperial';
    body = `<div class="onboarding-copy"><div class="step-eyebrow">STEP 1 OF 4 · ABOUT YOU</div><h3>Let’s start with the basics</h3><p>This helps us make your daily budget more personal. You can change it anytime.</p></div><div class="form-grid"><div class="form-field full"><label for="on-name">First name</label><input id="on-name" data-onboarding="firstName" value="${escapeHtml(d.firstName)}" /></div><div class="form-field"><label for="on-age">Age</label><input id="on-age" data-onboarding="age" type="number" min="13" max="100" value="${d.age}" /></div><div class="form-field"><label for="on-sex">Sex used for estimate</label><select id="on-sex" data-onboarding="sex"><option value="female" ${d.sex === 'female' ? 'selected' : ''}>Female</option><option value="male" ${d.sex === 'male' ? 'selected' : ''}>Male</option></select></div><div class="form-field full"><label>Units</label><div class="segmented"><button class="${!imperial ? 'active' : ''}" data-unit="metric">Metric · kg / cm</button><button class="${imperial ? 'active' : ''}" data-unit="imperial">Imperial · lb / ft</button></div></div><div class="form-field"><label for="on-height">Height (${imperial ? 'in' : 'cm'})</label><input id="on-height" data-onboarding="height" type="number" min="50" max="260" value="${d.height}" /></div><div class="form-field"><label for="on-weight">Weight (${imperial ? 'lb' : 'kg'})</label><input id="on-weight" data-onboarding="weight" type="number" min="30" max="600" step=".1" value="${d.weight}" /></div></div>`;
  } else if (step === 2) {
    body = `<div class="onboarding-copy"><div class="step-eyebrow">STEP 2 OF 4 · MOVEMENT</div><h3>How active are you?</h3><p>Choose the closest fit for a typical week. It’s okay if you’re between two.</p></div><div class="choice-list">${activityOptions.map(([id, title, copy, emoji]) => `<button class="choice ${d.activity === id ? 'selected' : ''}" data-activity="${id}"><span class="choice-emoji">${emoji}</span><span class="choice-copy"><strong>${title}</strong><span>${copy}</span></span><span class="choice-radio"></span></button>`).join('')}</div>`;
  } else if (step === 3) {
    body = `<div class="onboarding-copy"><div class="step-eyebrow">STEP 3 OF 4 · YOUR DIRECTION</div><h3>What’s your goal?</h3><p>We’ll use this to set a supportive starting point — never a strict prescription.</p></div><div class="choice-list"><button class="choice ${d.goal === 'lose' ? 'selected' : ''}" data-goal="lose"><span class="choice-emoji">🌿</span><span class="choice-copy"><strong>Lose weight</strong><span>Build a gentle calorie deficit over time</span></span><span class="choice-radio"></span></button><button class="choice ${d.goal === 'maintain' ? 'selected' : ''}" data-goal="maintain"><span class="choice-emoji">⚖️</span><span class="choice-copy"><strong>Maintain weight</strong><span>Keep your energy and weight steady</span></span><span class="choice-radio"></span></button><button class="choice ${d.goal === 'gain' ? 'selected' : ''}" data-goal="gain"><span class="choice-emoji">🌱</span><span class="choice-copy"><strong>Gain weight</strong><span>Support gradual, intentional progress</span></span><span class="choice-radio"></span></button></div>${d.goal === 'lose' ? '<div class="form-field" style="margin-top:15px"><label for="on-goal-weight">Goal weight ' + (modalState.unit === 'imperial' ? 'lb' : 'kg') + '</label><input id="on-goal-weight" data-onboarding="goalWeight" type="number" min="35" max="300" step=".1" value="' + d.goalWeight + '" /></div>' : ''}`;
  } else {
    body = `<div class="onboarding-copy"><div class="step-eyebrow">STEP 4 OF 4 · YOUR PACE</div><h3>Choose a comfortable pace</h3><p>Slower progress is still progress. We’ll keep your target reasonable.</p></div><div class="choice-list"><button class="choice ${d.pace === 'slow' ? 'selected' : ''}" data-pace="slow"><span class="choice-emoji">🐢</span><span class="choice-copy"><strong>Slow and steady</strong><span>A gentle 250 calorie daily deficit</span></span><span class="choice-radio"></span></button><button class="choice ${d.pace === 'moderate' ? 'selected' : ''}" data-pace="moderate"><span class="choice-emoji">🌤️</span><span class="choice-copy"><strong>Moderate</strong><span>A balanced 400 calorie daily deficit</span></span><span class="choice-radio"></span></button><button class="choice ${d.pace === 'faster' ? 'selected' : ''}" data-pace="faster"><span class="choice-emoji">🚀</span><span class="choice-copy"><strong>Faster, but reasonable</strong><span>A 550 calorie daily deficit — never extreme</span></span><span class="choice-radio"></span></button></div><div class="profile-note"><span data-icon="shield-check"></span><span>Estimates are a starting point, not medical advice. If you have health concerns, check in with a qualified professional.</span></div>`;
  }
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal" role="dialog" aria-modal="true" aria-labelledby="onboarding-title"><div class="modal-head"><div><h2 id="onboarding-title">${modalState.resetMode ? 'Reset your goal & plan' : 'Personalize your plan'}</h2><p>${modalState.resetMode ? 'Choose a fresh direction without deleting your diary.' : 'Small details, simpler guidance.'}</p></div><button class="modal-close" data-action="close-modal" aria-label="Close"><span data-icon="x"></span></button></div><div class="onboarding-progress">${[1, 2, 3, 4].map((item) => `<span class="${item <= step ? 'active' : ''}"></span>`).join('')}</div><div class="modal-body">${body}</div><div class="modal-actions"><button class="secondary-button" data-action="${step === 1 ? 'close-modal' : 'onboarding-back'}">${step === 1 ? 'Cancel' : '<span data-icon="arrow-left"></span> Back'}</button><button class="primary-button" data-action="${step === 4 ? 'save-profile' : 'onboarding-next'}">${step === 4 ? 'Save my plan' : 'Continue'} <span data-icon="arrow-right"></span></button></div></section></div>`;
}

function installModalTemplate() {
  const standalone = window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone;
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal install-modal" role="dialog" aria-modal="true" aria-labelledby="install-title"><div class="modal-head"><div><h2 id="install-title">Take CaloCoach with you</h2><p>${standalone ? 'CaloCoach is already installed on this device.' : 'Add it to your home screen for a focused app experience.'}</p></div><button class="modal-close" data-action="close-modal" aria-label="Close"><span data-icon="x"></span></button></div><div class="modal-body"><div class="install-hero"><div class="install-app-icon"><img src="./icons/icon-192.png" alt="CaloCoach app icon" /></div><div><strong>CaloCoach</strong><span>Your daily budget, right where you need it.</span></div></div><div class="install-steps"><div><b>1</b><p><strong>Android</strong><br>Tap <strong>Install app</strong> below, or use your browser menu and choose “Install app.”</p></div><div><b>2</b><p><strong>iPhone or iPad</strong><br>Tap the Share button in Safari, then choose <strong>Add to Home Screen</strong>.</p></div></div><div class="install-note"><span data-icon="shield-check"></span><span>Your plan stays on this device in the demo. You can use CaloCoach offline after the first visit.</span></div><a class="phone-preview-link" href="./phone-preview.html" target="_blank" rel="noopener"><span data-icon="smartphone"></span> Open the phone preview</a></div><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Maybe later</button>${standalone ? '' : '<button class="primary-button" data-action="request-install"><span data-icon="download"></span> Install CaloCoach</button>'}</div></section></div>`;
}

function suggestionsModalTemplate() {
  const suggestions = modalState.suggestions || [];
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="suggestions-title"><div class="modal-head"><div><h2 id="suggestions-title">Build a meal that fits</h2><p>Simple ideas, sized for the calories you have in mind.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close"><span data-icon="x"></span></button></div><div class="modal-body"><div class="form-grid suggestion-controls"><div class="form-field"><label for="suggestion-meal">I’m planning</label><select id="suggestion-meal" data-suggestion="meal"><option ${modalState.suggestionMeal === 'Breakfast' ? 'selected' : ''}>Breakfast</option><option ${modalState.suggestionMeal === 'Lunch' ? 'selected' : ''}>Lunch</option><option ${modalState.suggestionMeal === 'Dinner' ? 'selected' : ''}>Dinner</option><option ${modalState.suggestionMeal === 'Snack' ? 'selected' : ''}>Snack</option></select></div><div class="form-field"><label for="suggestion-range">Calorie range</label><select id="suggestion-range" data-suggestion="range"><option value="400" ${Number(modalState.suggestionRange) === 400 ? 'selected' : ''}>Under 400 kcal</option><option value="600" ${Number(modalState.suggestionRange) === 600 ? 'selected' : ''}>Under 600 kcal</option><option value="800" ${Number(modalState.suggestionRange) === 800 ? 'selected' : ''}>Under 800 kcal</option></select></div></div>${suggestions.length ? `<div class="suggestion-list">${suggestions.map((suggestion) => `<article class="suggestion-card"><div class="suggestion-card-head"><div><h3>${escapeHtml(suggestion.name)}</h3><span>${suggestion.calories} kcal estimate</span></div><div class="suggestion-dish">🍽️</div></div><p>${escapeHtml(suggestion.ingredients)}</p><div class="suggestion-prep"><span data-icon="utensils"></span>${escapeHtml(suggestion.prep)}</div><button class="text-button" data-action="use-suggestion" data-suggestion-name="${escapeHtml(suggestion.name)}" data-suggestion-calories="${suggestion.calories}">Log this idea <span data-icon="arrow-up-right"></span></button></article>`).join('')}</div>` : `<div class="suggestion-empty"><div class="coach-avatar">${icon('sparkles', 18)}</div><strong>Ready when you are.</strong><span>Choose a meal and calorie range, then let your coach do the brainstorming.</span></div>`}</div><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Close</button><button class="primary-button" data-action="generate-suggestions"><span data-icon="sparkles"></span> ${suggestions.length ? 'Refresh ideas' : 'Show me ideas'}</button></div></section></div>`;
}

function weightModalTemplate() {
  const entry = modalState.entry || {};
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal" role="dialog" aria-modal="true"><div class="modal-head"><div><h2>Log your weight</h2><p>One data point at a time. Trends matter more than fluctuations.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close"><span data-icon="x"></span></button></div><div class="modal-body"><div class="form-grid"><div class="form-field"><label for="weight-date">Date</label><input id="weight-date" data-weight="date" type="date" value="${entry.date || todayKey}" /></div><div class="form-field"><label for="weight-value">Weight (kg)</label><input id="weight-value" data-weight="weight" type="number" min="30" max="300" step=".1" value="${entry.weight || ''}" placeholder="78.5" /></div></div><div class="profile-note" style="margin-top:17px"><span data-icon="info-circle"></span><span>Try to log under similar conditions when you can, but don’t worry about making every entry perfect.</span></div></div><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button" data-action="save-weight">Save weight <span data-icon="check-circle"></span></button></div></section></div>`;
}

function calculateBudget(draft) {
  const kg = modalState.unit === 'imperial' ? Number(draft.weight) * 0.453592 : Number(draft.weight);
  const cm = modalState.unit === 'imperial' ? Number(draft.height) * 2.54 : Number(draft.height);
  const bmr = 10 * kg + 6.25 * cm - 5 * Number(draft.age) + (draft.sex === 'male' ? 5 : -161);
  const maintenance = Math.max(1400, Math.round((bmr * (activityMultipliers[draft.activity] || 1.55)) / 50) * 50);
  const deficit = draft.goal === 'lose' ? paceDeficits[draft.pace] || 400 : draft.goal === 'gain' ? -250 : 0;
  const dailyTarget = Math.max(draft.sex === 'male' ? 1500 : 1200, Math.round((maintenance - deficit) / 50) * 50);
  return { maintenance, deficit, dailyTarget, kg, cm };
}

function openAddFoodModal(tab = 'search', log = null, meal = 'Dinner') {
  modal = 'add-food';
  modalState = { tab, search: '', selectedFoodId: '', quantity: 1, meal, quickCalories: log ? log.calories : '', quickName: log ? log.name : '', editLogId: log ? log.id : '', photoAnalyzed: false };
  renderModal();
}
function openProfileModal() {
  modal = 'onboarding';
  modalState = { step: 1, unit: state.profile.weightUnit === 'lb' ? 'imperial' : 'metric', draft: { ...state.profile } };
  renderModal();
}
function openPlanResetModal() {
  const current = state.weights.length ? state.weights[state.weights.length - 1].weight : state.profile.weight;
  modal = 'onboarding';
  modalState = { step: 3, resetMode: true, unit: state.profile.weightUnit === 'lb' ? 'imperial' : 'metric', draft: { ...state.profile, goal: 'lose', pace: 'moderate', goalWeight: Math.max(35, Number(current) - (state.profile.weightUnit === 'lb' ? 11 : 5)) } };
  renderModal();
}
function openWeightModal() { modal = 'weight'; modalState = { entry: { date: todayKey, weight: '' } }; renderModal(); }
function openSuggestionsModal() { modal = 'suggestions'; modalState = { suggestionMeal: 'Dinner', suggestionRange: 600, suggestions: [] }; renderModal(); }
function openInstallModal() { modal = 'install'; modalState = {}; renderModal(); }
async function requestInstall() {
  if (!deferredInstallPrompt) { openInstallModal(); return; }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  if (choice.outcome === 'accepted') showToast('CaloCoach was added to your home screen.');
}
function closeModal() { modal = null; modalState = {}; renderModal(); }

function closeMobileMenu() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('mobile-scrim')?.classList.remove('open');
  document.body.classList.remove('sidebar-open');
}
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const open = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', open);
  document.getElementById('mobile-scrim')?.classList.toggle('open', open);
  document.body.classList.toggle('sidebar-open', open);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${icon(type === 'success' ? 'check-circle' : 'info-circle', 15)}<span>${escapeHtml(message)}</span>`;
  document.getElementById('toast-stack').appendChild(toast);
  setTimeout(() => toast.remove(), 3400);
}

function addFoodToDiary() {
  const meal = document.querySelector('[data-modal-input="meal"]')?.value || modalState.meal || 'Dinner';
  if (modalState.editLogId) {
    const log = state.logs.find((item) => item.id === modalState.editLogId);
    if (log) {
      log.name = document.querySelector('[data-modal-input="quick-name"]')?.value || log.name;
      log.calories = Number(document.querySelector('[data-modal-input="quick-calories"]')?.value || log.calories);
      log.meal = meal;
      log.source = 'quick_add';
    }
    closeModal(); renderView(); showToast('Your food log was updated.'); return;
  }
  if (modalState.tab === 'quick') {
    const calories = Number(document.querySelector('[data-modal-input="quick-calories"]')?.value || 0);
    const name = document.querySelector('[data-modal-input="quick-name"]')?.value.trim() || 'Quick add';
    if (!calories || calories < 1) { showToast('Add a calorie amount first.', 'info'); return; }
    state.logs.push({ id: `log-${Date.now()}`, date: todayKey, meal, name, calories, quantity: '1 entry', emoji: '🥄', source: 'quick_add' });
    closeModal(); renderView(); showToast(`${formatNumber(calories)} calories added to ${meal.toLowerCase()}.`); return;
  }
  if (modalState.tab === 'photo') {
    state.logs.push({ id: `log-${Date.now()}`, date: todayKey, meal, name: 'Rice, grilled chicken & vegetables', calories: 600, quantity: '1 plate · estimated', emoji: '🍱', source: 'ai_photo' });
    closeModal(); renderView(); showToast('AI estimate added after your review.'); return;
  }
  const food = foodCatalog.find((item) => item.id === modalState.selectedFoodId);
  if (!food) return;
  const quantity = Number(document.querySelector('[data-modal-input="quantity"]')?.value || 1);
  const calories = Math.round(food.calories * quantity);
  state.logs.push({ id: `log-${Date.now()}`, date: todayKey, meal, name: food.name, calories, quantity: `${quantity} ${quantity === 1 ? 'serving' : 'servings'}`, emoji: food.emoji, source: 'search' });
  closeModal(); renderView(); showToast(`${food.name} added to ${meal.toLowerCase()}.`);
}

function sendCoachMessage(text) {
  const question = String(text || '').trim();
  if (!question) return;
  const context = NutritionStore.context();
  state.coachMessages.push({ role: 'user', time: timeLabel(), message: question });
  state.coachMessages.push({ role: 'coach', time: timeLabel(), message: '…' });
  NutritionStore.save();
  state.activeView = 'coach'; renderView();
  setTimeout(async () => {
    const answer = await AIService.answerCoachQuestion(question, context);
    const waiting = state.coachMessages.findLast((message) => message.role === 'coach' && message.message === '…');
    if (waiting) { waiting.message = answer; waiting.time = timeLabel(); }
    NutritionStore.save(); renderView();
  }, 380);
}

function saveProfile() {
  const d = modalState.draft;
  const budget = calculateBudget(d);
  const activityLabels = { sedentary: 'Sedentary', light: 'Lightly active', moderate: 'Moderately active', very: 'Very active', extreme: 'Extremely active' };
  const nextWeightUnit = modalState.unit === 'imperial' ? 'lb' : 'kg';
  if (state.profile.weightUnit !== nextWeightUnit) {
    const factor = nextWeightUnit === 'lb' ? 2.20462 : 1 / 2.20462;
    state.weights = state.weights.map((entry) => ({ ...entry, weight: Math.round(entry.weight * factor * 10) / 10, unit: nextWeightUnit }));
  }
  state.profile = { ...state.profile, ...d, firstName: d.firstName || 'there', age: Number(d.age), height: Number(d.height), weight: Number(d.weight), goalWeight: Number(d.goalWeight || d.weight), activityLabel: activityLabels[d.activity] || 'Moderately active', maintenance: budget.maintenance, deficit: budget.deficit, dailyTarget: budget.dailyTarget, weightUnit: nextWeightUnit, heightUnit: modalState.unit === 'imperial' ? 'in' : 'cm', diet: 'Filipino-friendly', cuisine: 'Filipino' };
  delete state.profile.lastName;
  if (!state.weights.length) state.weights.push({ id: `weight-${Date.now()}`, date: todayKey, weight: modalState.unit === 'imperial' ? budget.kg * 2.20462 : budget.kg, unit: nextWeightUnit });
  NutritionStore.save(); closeModal(); renderView(); showToast('Your personal plan was updated.');
}

function syncOnboardingField(target) {
  const key = target.dataset.onboarding;
  if (!key || !modalState.draft) return;
  modalState.draft[key] = target.value;
}

function handleClick(event) {
  const viewTarget = event.target.closest('[data-view]');
  if (viewTarget) {
    state.activeView = viewTarget.dataset.view;
    closeMobileMenu();
    renderView();
    return;
  }
  const prompt = event.target.closest('[data-coach-prompt]');
  if (prompt) { sendCoachMessage(prompt.dataset.coachPrompt); return; }
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === 'toggle-sidebar') { toggleMobileMenu(); return; }
    if (action === 'toggle-theme') { const nextDark = !document.body.classList.contains('dark-mode'); localStorage.setItem('calocoach-theme', nextDark ? 'dark' : 'light'); applyTheme(); showToast(`${nextDark ? 'Dark' : 'Light'} mode is on.`); return; }
    if (action === 'install-app') { requestInstall(); return; }
    if (action === 'request-install') { if (deferredInstallPrompt) requestInstall().then(() => closeModal()); else showToast('On iPhone, use Safari Share → Add to Home Screen.', 'info'); return; }
    if (action === 'open-add-food') { openAddFoodModal('search', null, actionTarget.dataset.meal || 'Dinner'); return; }
    if (action === 'open-weight') { openWeightModal(); return; }
    if (action === 'open-suggestions') { openSuggestionsModal(); return; }
    if (action === 'generate-suggestions') {
      modalState.suggestionMeal = document.querySelector('[data-suggestion="meal"]')?.value || 'Dinner';
      modalState.suggestionRange = Number(document.querySelector('[data-suggestion="range"]')?.value || 600);
      AIService.generateMealSuggestions(modalState.suggestionRange, modalState.suggestionMeal).then((suggestions) => { modalState.suggestions = suggestions; renderModal(); });
      return;
    }
    if (action === 'use-suggestion') {
      const name = actionTarget.dataset.suggestionName || 'Meal idea';
      const calories = Number(actionTarget.dataset.suggestionCalories || 0);
      const meal = modalState.suggestionMeal || 'Dinner';
      openAddFoodModal('quick', { name, calories }, meal);
      return;
    }
    if (action === 'open-plan-reset') { openPlanResetModal(); return; }
    if (action === 'open-profile-edit' || action === 'open-settings') { openProfileModal(); return; }
    if (action === 'close-modal') { closeModal(); return; }
    if (action === 'confirm-add-food') { addFoodToDiary(); return; }
    if (action === 'analyze-photo') { modalState.photoAnalyzed = true; renderModal(); return; }
    if (action === 'choose-photo') { document.querySelector('[data-photo-input]')?.click(); return; }
    if (action === 'onboarding-next') { if (modalState.step < 4) { modalState.step += 1; renderModal(); } return; }
    if (action === 'onboarding-back') { modalState.step = Math.max(1, modalState.step - 1); renderModal(); return; }
    if (action === 'save-profile') { saveProfile(); return; }
    if (action === 'save-weight') {
      const value = Number(document.querySelector('[data-weight="weight"]')?.value);
      const date = document.querySelector('[data-weight="date"]')?.value || todayKey;
      if (!value || value < 30) { showToast('Enter a valid weight first.', 'info'); return; }
      state.weights = state.weights.filter((entry) => entry.date !== date);
      state.weights.push({ id: `weight-${Date.now()}`, date, weight: value, unit: 'kg' });
      state.weights.sort((a, b) => a.date.localeCompare(b.date));
      state.profile.weight = value; NutritionStore.save(); closeModal(); renderView(); showToast('Weight logged. Nice work showing up.'); return;
    }
    if (action === 'delete-log') {
      const log = state.logs.find((item) => item.id === actionTarget.dataset.logId);
      state.logs = state.logs.filter((item) => item.id !== actionTarget.dataset.logId); NutritionStore.save(); renderView(); showToast(`${log ? log.name : 'Food'} removed from your diary.`); return;
    }
    if (action === 'edit-log') { const log = state.logs.find((item) => item.id === actionTarget.dataset.logId); if (log) openAddFoodModal('quick', log, log.meal); return; }
    if (action === 'favorite-add') { openAddFoodModal('search'); modalState.selectedFoodId = actionTarget.dataset.foodId; renderModal(); return; }
    if (action === 'favorite-remove') { state.favorites = state.favorites.filter((id) => id !== actionTarget.dataset.foodId); NutritionStore.save(); renderView(); showToast('Removed from My foods.'); return; }
    if (action === 'toggle-favorite') {
      const foodId = actionTarget.dataset.foodId;
      if (state.favorites.includes(foodId)) state.favorites = state.favorites.filter((id) => id !== foodId); else state.favorites.push(foodId);
      NutritionStore.save(); renderModal(); return;
    }
    if (action === 'reset-demo') { localStorage.removeItem(NutritionStore.key); state = getSeedState(); renderView(); showToast('Demo data reset.'); return; }
  }
  const food = event.target.closest('[data-food-id]');
  if (food && modal === 'add-food') { modalState.selectedFoodId = food.dataset.foodId; renderModal(); return; }
  const tab = event.target.closest('[data-modal-tab]');
  if (tab && modal === 'add-food') { modalState.tab = tab.dataset.modalTab; renderModal(); return; }
  const unit = event.target.closest('[data-unit]');
  if (unit && modal === 'onboarding') {
    const nextUnit = unit.dataset.unit;
    if (nextUnit !== modalState.unit) {
      const factor = nextUnit === 'imperial' ? 2.20462 : 1 / 2.20462;
      const heightFactor = nextUnit === 'imperial' ? 1 / 2.54 : 2.54;
      modalState.draft.weight = Math.round(Number(modalState.draft.weight || 0) * factor * 10) / 10;
      modalState.draft.goalWeight = Math.round(Number(modalState.draft.goalWeight || 0) * factor * 10) / 10;
      modalState.draft.height = Math.round(Number(modalState.draft.height || 0) * heightFactor * 10) / 10;
      modalState.unit = nextUnit;
    }
    renderModal(); return;
  }
  const activity = event.target.closest('[data-activity]');
  if (activity && modal === 'onboarding') { modalState.draft.activity = activity.dataset.activity; renderModal(); return; }
  const goal = event.target.closest('[data-goal]');
  if (goal && modal === 'onboarding') { modalState.draft.goal = goal.dataset.goal; renderModal(); return; }
  const pace = event.target.closest('[data-pace]');
  if (pace && modal === 'onboarding') { modalState.draft.pace = pace.dataset.pace; renderModal(); return; }
  if (event.target.matches('[data-modal-backdrop]')) closeModal();
}

function handleInput(event) {
  if (event.target.matches('[data-onboarding]')) syncOnboardingField(event.target);
  if (event.target.matches('[data-modal-input="search"]')) {
    modalState.search = event.target.value;
    const cursor = event.target.selectionStart;
    renderModal();
    const next = document.querySelector('[data-modal-input="search"]');
    if (next) { next.focus(); next.setSelectionRange(cursor, cursor); }
  }
  if (event.target.matches('[data-modal-input="quantity"]')) modalState.quantity = event.target.value;
  if (event.target.matches('[data-modal-input="meal"]')) modalState.meal = event.target.value;
}

function handleChange(event) {
  if (event.target.matches('[data-onboarding]')) syncOnboardingField(event.target);
  if (event.target.matches('[data-photo-input]')) { if (event.target.files?.length) { modalState.photoAnalyzed = false; showToast('Photo ready — tap Analyze photo when you’re ready.'); } }
}

function handleSubmit(event) {
  const form = event.target.closest('[data-form]');
  if (!form) return;
  event.preventDefault();
  const input = form.querySelector('input[name="question"], textarea[name="question"]');
  const text = input?.value || '';
  if (text.trim()) { input.value = ''; sendCoachMessage(text); }
}

document.addEventListener('click', handleClick);
document.addEventListener('input', handleInput);
document.addEventListener('change', handleChange);
document.addEventListener('submit', handleSubmit);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal) closeModal(); });
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.body.classList.add('pwa-installable');
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  document.body.classList.remove('pwa-installable');
  showToast('CaloCoach is installed.');
});
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch((error) => console.info('Offline mode is unavailable in this browser.', error)));

document.getElementById('topbar-date').textContent = dateLabel(new Date());
renderView();
