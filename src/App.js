import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import Kitchen from './pages/Kitchen';
import Bar from './pages/Bar';
import NotFound from './pages/NotFound';

export function AppRoutes() {
    return (
        <>
            <ScrollManager />
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/kitchen" component={Kitchen} />
                <Route path="/bar" component={Bar} />
                {/* Old cocktail-api URL */}
                <Redirect from="/search" to="/bar" />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}
