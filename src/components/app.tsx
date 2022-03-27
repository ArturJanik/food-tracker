import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import Home from '../routes/home';
import NotFoundPage from '../routes/notfound';
import Header from './Header';
import Sidebar from './UI/Sidebar';

const App: FunctionalComponent = () => {
    return (
        <div id='preact_root'>
            <Header />
            <Router>
                <Route path='/' component={Home} />
                <NotFoundPage default />
            </Router>
            <Sidebar />
        </div>
    );
};

export default App;
