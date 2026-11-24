import { FiArrowUpRight } from 'react-icons/fi';

export default function DishDetail({ dish }) {
    const stats = [
        ['Per serving', `${dish.calories} kcal`],
        ['Serves', dish.servings],
        dish.time && ['Time', `${dish.time} min`],
        dish.protein != null && ['Protein', `${dish.protein} g`],
        dish.carbs != null && ['Carbs', `${dish.carbs} g`],
        dish.fat != null && ['Fat', `${dish.fat} g`],
    ].filter(Boolean);

    return (
        <article className="detail">
            <div className="detail__media">
                <img src={dish.image} alt={dish.name} />
            </div>
            <div className="detail__body">
                <p className="eyebrow">{[dish.cuisine, dish.course, dish.meal].filter(Boolean).join(' · ')}</p>
                <h2 className="detail__title">{dish.name}</h2>
                <div className="ornament" aria-hidden="true"><span /></div>

                <dl className="stats">
                    {stats.map(([k, v]) => (
                        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                </dl>

                <h3 className="detail__heading">Ingredients</h3>
                <ul className="ingredient-list">
                    {dish.ingredients.map((line, i) => <li key={i}>{line}</li>)}
                </ul>

                {(dish.diet.length > 0 || dish.health.length > 0) && (
                    <div className="tags tags--spaced">
                        {[...dish.diet, ...dish.health].map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                )}

                <a className="btn-lux" href={dish.url} target="_blank" rel="noreferrer">
                    Full method at {dish.source} <FiArrowUpRight aria-hidden="true" />
                </a>
            </div>
        </article>
    );
}
