import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const LINKS = [
    { to: '/', label: 'Home', exact: true },
    { to: '/kitchen', label: 'The Kitchen' },
    { to: '/bar', label: 'The Bar' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the mobile menu whenever the route changes.
    useEffect(() => setOpen(false), [location.pathname, location.search]);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', open);
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <header className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
            <div className="site-nav__inner">
                <Link to="/" className="brand" aria-label="Bootstrap Restaurant, home">
                    <span className="brand__mark">B</span>
                    <span className="brand__text">
                        <span className="brand__name">Bootstrap</span>
                        <span className="brand__sub">Restaurant &amp; Bar</span>
                    </span>
                </Link>

                <nav className="site-nav__links" aria-label="Main">
                    {LINKS.map((l) => (
                        <NavLink key={l.to} to={l.to} exact={l.exact} className="nav-link-lux" activeClassName="is-active">
                            {l.label}
                        </NavLink>
                    ))}
                    <Link to="/#visit" className="btn-lux btn-lux--sm site-nav__cta">Reserve</Link>
                </nav>

                <button
                    type="button"
                    className="burger"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((o) => !o)}
                >
                    <span /><span />
                </button>
            </div>

            <div id="mobile-menu" className="mobile-menu" hidden={!open}>
                <nav aria-label="Mobile">
                    {LINKS.map((l, i) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            exact={l.exact}
                            className="mobile-menu__link"
                            activeClassName="is-active"
                            style={{ transitionDelay: `${80 + i * 60}ms` }}
                        >
                            <span className="mobile-menu__num">0{i + 1}</span>
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
                <p className="mobile-menu__foot">Open Tuesday – Sunday</p>
            </div>
        </header>
    );
}
