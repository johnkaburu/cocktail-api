import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';

const drink = {
    idDrink: '11003',
    strDrink: 'Negroni',
    strDrinkThumb: 'https://example.test/negroni.jpg',
    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Old-fashioned glass',
    strInstructions: 'Stir into glass over ice. Garnish and serve.',
    strIngredient1: 'Gin', strMeasure1: '1 oz ',
    strIngredient2: 'Campari', strMeasure2: '1 oz ',
    strIngredient3: null,
};

const recipe = {
    uri: 'recipe_1',
    label: 'Lemon & pea risotto',
    image: 'https://example.test/risotto.jpg',
    source: 'BBC Good Food',
    url: 'https://example.test/risotto',
    yield: 2,
    calories: 976,
    totalTime: 30,
    cuisineType: ['italian'],
    dishType: ['main course'],
    mealType: ['lunch/dinner'],
    dietLabels: ['Balanced'],
    healthLabels: ['Vegetarian'],
    ingredientLines: ['200g risotto rice'],
    totalNutrients: { PROCNT: { quantity: 40 } },
};

beforeEach(() => {
    global.fetch = jest.fn((url) =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(url.includes('edamam') ? { hits: [{ recipe }] } : { drinks: [drink] }),
        })
    );
    window.scrollTo = jest.fn();
});

const renderAt = (path) =>
    render(
        <MemoryRouter initialEntries={[path]}>
            <AppRoutes />
        </MemoryRouter>
    );

test('home page shows the brand and signature cocktails', async () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Bootstrap/);
    expect((await screen.findAllByText('Negroni')).length).toBeGreaterThan(0);
});

test('bar page searches cocktails and opens a recipe', async () => {
    renderAt('/bar?q=negroni');
    fireEvent.click(await screen.findByText('Negroni', { selector: '.menu-card__title' }));
    expect(await screen.findByRole('dialog', { name: 'Negroni' })).toBeInTheDocument();
    expect(screen.getByText('Campari')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('search.php?s=negroni'), expect.anything());
});

test('old /search links redirect to the bar', async () => {
    renderAt('/search');
    expect(await screen.findByRole('heading', { name: 'The Bar' })).toBeInTheDocument();
});

test('unknown routes show the 404 page', () => {
    renderAt('/nowhere');
    expect(screen.getByText(/not set/)).toBeInTheDocument();
});
