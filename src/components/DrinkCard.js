export default function DrinkCard({ drink, index, onOpen }) {
    return (
        <button
            type="button"
            className="menu-card menu-card--drink"
            style={{ animationDelay: `${Math.min(index, 11) * 60}ms` }}
            onClick={() => onOpen(drink)}
        >
            <span className="menu-card__media">
                <img src={`${drink.image}/preview`} alt="" loading="lazy" />
                <span className="menu-card__num">{String(index + 1).padStart(2, '0')}</span>
            </span>
            <span className="menu-card__body">
                <span className="eyebrow">{[drink.category, drink.alcoholic].filter(Boolean).join(' · ')}</span>
                <span className="menu-card__title">{drink.name}</span>
                <span className="menu-card__desc">
                    {drink.ingredients.slice(0, 4).map((i) => i.name).join(', ')}
                    {drink.ingredients.length > 4 ? '…' : ''}
                </span>
                {drink.glass && (
                    <span className="menu-card__meta"><span>Served in a {drink.glass.toLowerCase()}</span></span>
                )}
                <span className="menu-card__cta">View the recipe</span>
            </span>
        </button>
    );
}
