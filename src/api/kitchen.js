// Edamam Recipe Search API (https://developer.edamam.com/edamam-docs-recipe-api)
// Credentials are read from .env.local (see .env.example).
const BASE = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;

const titleCase = (s = '') => s.replace(/\b\w/g, (c) => c.toUpperCase());

const perServing = (recipe, code) => {
    const n = recipe.totalNutrients && recipe.totalNutrients[code];
    if (!n) return null;
    return Math.round(n.quantity / (recipe.yield || 1));
};

export function normalizeDish(recipe) {
    const servings = recipe.yield || 1;
    return {
        id: recipe.uri,
        name: recipe.label,
        image: (recipe.images && recipe.images.REGULAR && recipe.images.REGULAR.url) || recipe.image,
        source: recipe.source,
        url: recipe.url,
        servings,
        time: recipe.totalTime > 0 ? Math.round(recipe.totalTime) : null,
        calories: Math.round(recipe.calories / servings),
        protein: perServing(recipe, 'PROCNT'),
        carbs: perServing(recipe, 'CHOCDF'),
        fat: perServing(recipe, 'FAT'),
        cuisine: titleCase((recipe.cuisineType || [])[0] || ''),
        course: titleCase((recipe.dishType || [])[0] || ''),
        meal: titleCase(((recipe.mealType || [])[0] || '').split('/')[0]),
        diet: recipe.dietLabels || [],
        health: (recipe.healthLabels || []).slice(0, 8),
        ingredients: recipe.ingredientLines || [],
    };
}

export async function searchDishes(query, { signal } = {}) {
    if (!APP_ID || !APP_KEY) {
        throw new Error('Edamam credentials are missing. Add them to .env.local and restart the dev server.');
    }
    const params = new URLSearchParams({ type: 'public', q: query, app_id: APP_ID, app_key: APP_KEY });
    const res = await fetch(`${BASE}?${params}`, { signal });
    if (!res.ok) throw new Error(`The kitchen is unavailable right now (${res.status}).`);
    const data = await res.json();
    return (data.hits || []).map((hit) => normalizeDish(hit.recipe));
}
