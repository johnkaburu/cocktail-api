export default function DrinkDetail({ drink }) {
    // Split the instructions into sentences for a numbered method.
    const steps = ((drink.instructions || '').match(/[^.!?]+[.!?]*/g) || [])
        .map((s) => s.trim())
        .filter((s) => s.length > 1);

    return (
        <article className="detail">
            <div className="detail__media">
                <img src={drink.image} alt={drink.name} />
            </div>
            <div className="detail__body">
                <p className="eyebrow">{[drink.category, drink.iba].filter(Boolean).join(' · ')}</p>
                <h2 className="detail__title">{drink.name}</h2>
                <div className="ornament" aria-hidden="true"><span /></div>

                <dl className="stats">
                    <div><dt>Style</dt><dd>{drink.alcoholic}</dd></div>
                    {drink.glass && <div><dt>Glass</dt><dd>{drink.glass}</dd></div>}
                    <div><dt>Ingredients</dt><dd>{drink.ingredients.length}</dd></div>
                </dl>

                <h3 className="detail__heading">Ingredients</h3>
                <ul className="ingredient-list ingredient-list--measures">
                    {drink.ingredients.map((ing) => (
                        <li key={ing.name}>
                            <span>{ing.name}</span>
                            <span className="dots" aria-hidden="true" />
                            <span className="measure">{ing.measure || 'to taste'}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="detail__heading">Method</h3>
                <ol className="method">
                    {steps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
            </div>
        </article>
    );
}
