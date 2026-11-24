/** Shared loading / error / empty / grid states for the menu pages. */
export default function Results({ status, error, items, query, noun, renderItem }) {
    if (status === 'loading' || status === 'idle') {
        return (
            <div className="menu-grid" aria-busy="true" aria-label="Loading">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="menu-card menu-card--skeleton">
                        <span className="menu-card__media shimmer" />
                        <span className="menu-card__body">
                            <span className="shimmer shimmer--line" style={{ width: '40%' }} />
                            <span className="shimmer shimmer--title" />
                            <span className="shimmer shimmer--line" style={{ width: '70%' }} />
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="empty">
                <p className="display-sm">Our apologies.</p>
                <p>{error.message}</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="empty">
                <p className="display-sm">Nothing on tonight's menu for “{query}”.</p>
                <p>Try another {noun}, or choose one of the suggestions above.</p>
            </div>
        );
    }

    return <div className="menu-grid">{items.map(renderItem)}</div>;
}
