import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import Reveal from '../components/Reveal';
import Modal from '../components/Modal';
import DrinkDetail from '../components/DrinkDetail';
import { getDrinksById } from '../api/bar';
import heroBar from '../assets/hero-bar.jpg';
import kitchenImg from '../assets/kitchen.jpg';
import martiniImg from '../assets/martini.jpg';
import whiskyImg from '../assets/whisky.jpg';
import glassImg from '../assets/glass.jpg';

// Negroni, Old Fashioned, Dry Martini, Espresso Martini, Manhattan
const SIGNATURE_IDS = ['11003', '11001', '11005', '17212', '11008'];

const PILLARS = [
    {
        n: 'I',
        title: 'The Kitchen',
        text: 'Seasonal produce, open-fire technique and a cookbook drawn from kitchens around the world.',
    },
    {
        n: 'II',
        title: 'The Bar',
        text: 'Stirred, shaken and poured with care. Classics kept honest, and a few we make our own.',
    },
    {
        n: 'III',
        title: 'The Room',
        text: 'Low light, dark wood and an unhurried pace. Stay for one drink or for the whole evening.',
    },
];

function SignatureList() {
    const [drinks, setDrinks] = useState([]);
    const [failed, setFailed] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        getDrinksById(SIGNATURE_IDS, { signal: controller.signal })
            .then(setDrinks)
            .catch((e) => e.name !== 'AbortError' && setFailed(true));
        return () => controller.abort();
    }, []);

    if (failed) {
        return <p className="muted">The cocktail list is resting. Please visit <Link to="/bar">the bar</Link>.</p>;
    }

    return (
        <>
            <ol className="signature-list">
                {(drinks.length ? drinks : SIGNATURE_IDS.map((id) => ({ id }))).map((d, i) => (
                    <li key={d.id}>
                        <button
                            type="button"
                            className="signature-item"
                            onClick={() => d.name && setSelected(d)}
                            disabled={!d.name}
                        >
                            <span className="signature-item__num">{String(i + 1).padStart(2, '0')}</span>
                            {d.image
                                ? <img src={`${d.image}/preview`} alt="" className="signature-item__img" loading="lazy" />
                                : <span className="signature-item__img shimmer" />}
                            <span className="signature-item__text">
                                <span className="signature-item__name">{d.name || ' '}</span>
                                <span className="signature-item__desc">
                                    {d.ingredients ? d.ingredients.map((x) => x.name).join(' · ') : ' '}
                                </span>
                            </span>
                            <span className="signature-item__arrow" aria-hidden="true"><FiArrowRight /></span>
                        </button>
                    </li>
                ))}
            </ol>
            <Modal open={!!selected} onClose={() => setSelected(null)} label={selected ? selected.name : ''}>
                {selected && <DrinkDetail drink={selected} />}
            </Modal>
        </>
    );
}

export default function Home() {
    return (
        <main>
            {/* ——— Hero ——— */}
            <section className="hero" style={{ backgroundImage: `url(${heroBar})` }}>
                <div className="hero__shade" />
                <div className="hero__content container-lux">
                    <p className="eyebrow eyebrow--gold hero__eyebrow">Fine dining · Cocktail bar · Est. MMXXI</p>
                    <h1 className="hero__title">
                        Bootstrap
                        <em>Restaurant &amp; Bar</em>
                    </h1>
                    <p className="hero__lede">
                        One kitchen, one bar, a single idea: food and drink made with patience.
                    </p>
                    <div className="hero__actions">
                        <Link to="/kitchen" className="btn-lux btn-lux--solid">Explore the Kitchen</Link>
                        <Link to="/bar" className="btn-lux">Visit the Bar</Link>
                    </div>
                </div>
                <a href="#story" className="hero__scroll" aria-label="Scroll to our story">
                    <span>Scroll</span>
                    <FiArrowDown aria-hidden="true" />
                </a>
            </section>

            {/* ——— Story ——— */}
            <section id="story" className="section section--ink">
                <div className="container-lux story">
                    <Reveal className="story__text">
                        <p className="eyebrow eyebrow--gold">Our story</p>
                        <h2 className="display-md">Built from the ground up, <em>one layer at a time.</em></h2>
                        <p>
                            Bootstrap began as two ideas at two counters, a kitchen that loved to cook and a
                            bar that loved to pour. We brought them under one roof, so dinner and the drink
                            that follows are planned together.
                        </p>
                        <p>
                            Search our cookbook of recipes from around the world, or ask the bar for a
                            classic made properly. Either way, take your time.
                        </p>
                        <p className="signature">The Bootstrap House</p>
                    </Reveal>
                    <Reveal className="story__media" delay={150}>
                        <div className="frame">
                            <img src={glassImg} alt="A cut-crystal tumbler with an amber drink" loading="lazy" />
                        </div>
                        <div className="story__badge">
                            <span className="display-sm">MMXXI</span>
                            <span className="eyebrow">Since</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ——— Pillars ——— */}
            <section className="section section--ink-2">
                <div className="container-lux">
                    <Reveal className="section-head">
                        <p className="eyebrow eyebrow--gold">The house</p>
                        <h2 className="display-md">Three rooms, one table</h2>
                        <div className="ornament" aria-hidden="true"><span /></div>
                    </Reveal>
                    <div className="pillars">
                        {PILLARS.map((p, i) => (
                            <Reveal key={p.n} className="pillar" delay={i * 120}>
                                <span className="pillar__num">{p.n}</span>
                                <h3 className="pillar__title">{p.title}</h3>
                                <p>{p.text}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ——— Kitchen & Bar split ——— */}
            <section className="split" aria-label="Menus">
                <Link to="/kitchen" className="split__panel">
                    <span className="split__img" style={{ backgroundImage: `url(${kitchenImg})` }} />
                    <span className="split__shade" />
                    <span className="split__content">
                        <span className="eyebrow eyebrow--gold">À la carte</span>
                        <span className="split__title">The Kitchen</span>
                        <span className="split__text">Recipes from kitchens around the world, with ingredients and nutrition for each.</span>
                        <span className="split__link">Browse the menu <FiArrowRight aria-hidden="true" /></span>
                    </span>
                </Link>
                <Link to="/bar" className="split__panel">
                    <span className="split__img" style={{ backgroundImage: `url(${martiniImg})` }} />
                    <span className="split__shade" />
                    <span className="split__content">
                        <span className="eyebrow eyebrow--gold">Après dîner</span>
                        <span className="split__title">The Bar</span>
                        <span className="split__text">Hundreds of cocktails, from the Negroni to the one you first tried on holiday.</span>
                        <span className="split__link">See the list <FiArrowRight aria-hidden="true" /></span>
                    </span>
                </Link>
            </section>

            {/* ——— Signature cocktails ——— */}
            <section className="section section--ink">
                <div className="container-lux signature-wrap">
                    <Reveal className="section-head section-head--left">
                        <p className="eyebrow eyebrow--gold">From the bar</p>
                        <h2 className="display-md">Signature <em>serves</em></h2>
                        <p className="muted">
                            Five classics we will make for you on any night of the week. Select one for the recipe.
                        </p>
                        <Link to="/bar" className="btn-lux">The full cocktail list</Link>
                    </Reveal>
                    <Reveal delay={150}>
                        <SignatureList />
                    </Reveal>
                </div>
            </section>

            {/* ——— Quote band ——— */}
            <section className="quote-band" style={{ backgroundImage: `url(${whiskyImg})` }}>
                <div className="quote-band__shade" />
                <Reveal as="blockquote" className="quote-band__quote container-lux">
                    <span className="quote-band__mark" aria-hidden="true">“</span>
                    <p>Good food asks for good company, and the right glass beside it.</p>
                    <footer className="eyebrow eyebrow--gold">The house philosophy</footer>
                </Reveal>
            </section>

            {/* ——— Visit ——— */}
            <section id="visit" className="section section--ink-2">
                <div className="container-lux">
                    <Reveal className="section-head">
                        <p className="eyebrow eyebrow--gold">Reservations</p>
                        <h2 className="display-md">Join us for the evening</h2>
                        <div className="ornament" aria-hidden="true"><span /></div>
                    </Reveal>
                    <div className="visit">
                        <Reveal className="visit__card">
                            <h3 className="eyebrow">Dinner</h3>
                            <p className="display-sm">Tue – Sat</p>
                            <p>Seatings from 17:00<br />Last orders 22:30</p>
                        </Reveal>
                        <Reveal className="visit__card visit__card--feature" delay={120}>
                            <h3 className="eyebrow eyebrow--gold">Reserve a table</h3>
                            <p className="display-sm">By telephone or at the door</p>
                            <p>We hold tables for fifteen minutes. The bar is kept for walk-ins every night.</p>
                        </Reveal>
                        <Reveal className="visit__card" delay={240}>
                            <h3 className="eyebrow">Sunday</h3>
                            <p className="display-sm">Long lunch</p>
                            <p>12:00 – 22:00<br />Kitchen and bar open all day</p>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
