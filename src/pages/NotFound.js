import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main className="not-found">
            <p className="eyebrow eyebrow--gold">404</p>
            <h1 className="display-lg">This table is <em>not set</em></h1>
            <p className="lede">The page you were looking for isn’t on the menu.</p>
            <Link to="/" className="btn-lux btn-lux--solid">Return to the house</Link>
        </main>
    );
}
