import { useState } from 'react';
import PageHero from '../components/PageHero';
import Results from '../components/Results';
import DrinkCard from '../components/DrinkCard';
import DrinkDetail from '../components/DrinkDetail';
import Modal from '../components/Modal';
import useSearch from '../hooks/useSearch';
import { searchDrinks } from '../api/bar';
import whiskyImg from '../assets/whisky.jpg';

const SUGGESTIONS = ['Martini', 'Negroni', 'Old Fashioned', 'Sour', 'Spritz', 'Margarita', 'Mojito', 'Mule'];

export default function Bar() {
    const { query, search, status, results, error } = useSearch(searchDrinks, 'martini');
    const [selected, setSelected] = useState(null);

    return (
        <main>
            <PageHero
                image={whiskyImg}
                eyebrow="Après dîner"
                title="The Bar"
                intro="Name a cocktail or a spirit and the bar will pour you the recipe, with measures, glassware and method."
                placeholder="Search cocktails, e.g. “gimlet”"
                query={query}
                suggestions={SUGGESTIONS}
                onSearch={search}
            />

            <section className="section section--ink menu-section">
                <div className="container-lux">
                    <div className="menu-head">
                        <h2 className="display-sm">
                            {status === 'done' ? <>From the bar: <em>{query}</em></> : <>Mixing <em>{query}</em>…</>}
                        </h2>
                        {status === 'done' && results.length > 0 && <p className="eyebrow">{results.length} cocktails</p>}
                    </div>
                    <Results
                        status={status}
                        error={error}
                        items={results}
                        query={query}
                        noun="cocktail"
                        renderItem={(drink, i) => <DrinkCard key={drink.id} drink={drink} index={i} onOpen={setSelected} />}
                    />
                </div>
            </section>

            <Modal open={!!selected} onClose={() => setSelected(null)} label={selected ? selected.name : ''}>
                {selected && <DrinkDetail drink={selected} />}
            </Modal>
        </main>
    );
}
