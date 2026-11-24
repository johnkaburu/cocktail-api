import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

/** Banner at the top of the Kitchen and Bar pages, with the search form. */
export default function PageHero({ image, eyebrow, title, intro, placeholder, query, suggestions, onSearch }) {
    const [value, setValue] = useState(query);
    useEffect(() => setValue(query), [query]);

    const submit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    return (
        <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
            <div className="page-hero__shade" />
            <div className="page-hero__content container-lux">
                <p className="eyebrow eyebrow--gold">{eyebrow}</p>
                <h1 className="display-lg">{title}</h1>
                <p className="lede">{intro}</p>

                <form className="search-lux" onSubmit={submit} role="search">
                    <FiSearch aria-hidden="true" className="search-lux__icon" />
                    <input
                        type="search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        autoComplete="off"
                    />
                    <button type="submit" className="btn-lux btn-lux--solid">Search</button>
                </form>

                <div className="chips" aria-label="Suggestions">
                    {suggestions.map((s) => (
                        <button
                            key={s}
                            type="button"
                            className={`chip ${s.toLowerCase() === query.toLowerCase() ? 'is-active' : ''}`}
                            onClick={() => onSearch(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
