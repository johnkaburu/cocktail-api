import { useState } from 'react';
import PageHero from '../components/PageHero';
import Results from '../components/Results';
import DishCard from '../components/DishCard';
import DishDetail from '../components/DishDetail';
import Modal from '../components/Modal';
import useSearch from '../hooks/useSearch';
import { searchDishes } from '../api/kitchen';
import kitchenImg from '../assets/kitchen.jpg';

const SUGGESTIONS = ['Salmon', 'Risotto', 'Lamb', 'Sushi', 'Truffle', 'Scallops', 'Duck', 'Tiramisu'];

export default function Kitchen() {
    const { query, search, status, results, error } = useSearch(searchDishes, 'salmon');
    const [selected, setSelected] = useState(null);

    return (
        <main>
            <PageHero
                image={kitchenImg}
                eyebrow="À la carte"
                title="The Kitchen"
                intro="Ask the kitchen for a dish, an ingredient or a cuisine. Each recipe lists its ingredients and nutrition, with a link to the full method."
                placeholder="Search dishes, e.g. “sea bass”"
                query={query}
                suggestions={SUGGESTIONS}
                onSearch={search}
            />

            <section className="section section--ink menu-section">
                <div className="container-lux">
                    <div className="menu-head">
                        <h2 className="display-sm">
                            {status === 'done' ? <>Tonight’s menu: <em>{query}</em></> : <>Preparing <em>{query}</em>…</>}
                        </h2>
                        {status === 'done' && results.length > 0 && <p className="eyebrow">{results.length} dishes</p>}
                    </div>
                    <Results
                        status={status}
                        error={error}
                        items={results}
                        query={query}
                        noun="dish"
                        renderItem={(dish, i) => <DishCard key={dish.id} dish={dish} index={i} onOpen={setSelected} />}
                    />
                </div>
            </section>

            <Modal open={!!selected} onClose={() => setSelected(null)} label={selected ? selected.name : ''}>
                {selected && <DishDetail dish={selected} />}
            </Modal>
        </main>
    );
}
