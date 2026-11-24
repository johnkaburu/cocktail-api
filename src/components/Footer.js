import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container-lux">
                <div className="site-footer__top">
                    <div className="site-footer__brand">
                        <span className="brand__mark brand__mark--lg">B</span>
                        <p className="display-sm">Bootstrap</p>
                        <p className="eyebrow">Restaurant &amp; Bar · Est. MMXXI</p>
                    </div>

                    <div className="site-footer__col">
                        <h3 className="eyebrow">Explore</h3>
                        <Link to="/kitchen">The Kitchen</Link>
                        <Link to="/bar">The Bar</Link>
                        <Link to="/#visit">Reservations</Link>
                    </div>

                    <div className="site-footer__col">
                        <h3 className="eyebrow">Hours</h3>
                        <p>Tue – Thu · 17:00 – 23:00</p>
                        <p>Fri – Sat · 17:00 – 01:00</p>
                        <p>Sunday · 12:00 – 22:00</p>
                    </div>

                    <div className="site-footer__col">
                        <h3 className="eyebrow">Follow</h3>
                        <div className="socials">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <p>© {new Date().getFullYear()} Bootstrap Restaurant &amp; Bar</p>
                    <p>
                        Recipes by <a href="https://www.edamam.com" target="_blank" rel="noreferrer">Edamam</a> ·
                        Cocktails by <a href="https://www.thecocktaildb.com" target="_blank" rel="noreferrer">TheCocktailDB</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
