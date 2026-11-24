import { FiClock } from 'react-icons/fi';

export default function DishCard({ dish, index, onOpen }) {
    const meta = [dish.cuisine, dish.course].filter(Boolean).join(' · ');
    return (
        <button
            type="button"
            className="menu-card"
            style={{ animationDelay: `${Math.min(index, 11) * 60}ms` }}
            onClick={() => onOpen(dish)}
        >
            <span className="menu-card__media">
                <img src={dish.image} alt="" loading="lazy" />
                <span className="menu-card__num">{String(index + 1).padStart(2, '0')}</span>
            </span>
            <span className="menu-card__body">
                {meta && <span className="eyebrow">{meta}</span>}
                <span className="menu-card__title">{dish.name}</span>
                <span className="menu-card__meta">
                    <span>{dish.calories} kcal</span>
                    {dish.time && <span><FiClock aria-hidden="true" /> {dish.time} min</span>}
                    <span>Serves {dish.servings}</span>
                </span>
                {dish.diet.length > 0 && (
                    <span className="tags">
                        {dish.diet.slice(0, 3).map((d) => <span key={d} className="tag">{d}</span>)}
                    </span>
                )}
                <span className="menu-card__cta">View the recipe</span>
            </span>
        </button>
    );
}
