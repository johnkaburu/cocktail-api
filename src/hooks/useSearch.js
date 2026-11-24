import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * Runs `searchFn(query)` whenever the `?q=` URL param changes, so searches
 * are shareable and work with the browser's back button.
 */
export default function useSearch(searchFn, defaultQuery) {
    const location = useLocation();
    const history = useHistory();
    const query = new URLSearchParams(location.search).get('q') || defaultQuery;

    const [state, setState] = useState({ status: 'idle', results: [], error: null });

    useEffect(() => {
        if (!query) return undefined;
        const controller = new AbortController();
        setState((s) => ({ ...s, status: 'loading', error: null }));
        searchFn(query, { signal: controller.signal })
            .then((results) => setState({ status: 'done', results, error: null }))
            .catch((error) => {
                if (error.name === 'AbortError') return;
                setState({ status: 'error', results: [], error });
            });
        return () => controller.abort();
    }, [query, searchFn]);

    const search = useCallback(
        (q) => {
            const trimmed = q.trim();
            if (trimmed) history.push({ search: `?q=${encodeURIComponent(trimmed)}` });
        },
        [history]
    );

    return { query, search, ...state };
}
