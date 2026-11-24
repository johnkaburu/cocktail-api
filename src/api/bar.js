// TheCocktailDB (https://www.thecocktaildb.com/api.php) — free test key "1".
const BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

export function normalizeDrink(d) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const name = d[`strIngredient${i}`];
        if (name && name.trim()) {
            ingredients.push({ name: name.trim(), measure: (d[`strMeasure${i}`] || '').trim() });
        }
    }
    return {
        id: d.idDrink,
        name: d.strDrink,
        image: d.strDrinkThumb,
        category: d.strCategory,
        alcoholic: d.strAlcoholic,
        glass: d.strGlass,
        iba: d.strIBA,
        instructions: d.strInstructions,
        ingredients,
    };
}

async function get(path, signal) {
    const res = await fetch(`${BASE}/${path}`, { signal });
    if (!res.ok) throw new Error(`The bar is unavailable right now (${res.status}).`);
    const data = await res.json();
    return (data.drinks || []).map(normalizeDrink);
}

export function searchDrinks(query, { signal } = {}) {
    return get(`search.php?s=${encodeURIComponent(query)}`, signal);
}

export async function getDrinksById(ids, { signal } = {}) {
    const results = await Promise.all(ids.map((id) => get(`lookup.php?i=${id}`, signal)));
    return results.flat();
}
