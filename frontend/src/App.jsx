// eslint-disable-next-line
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import History from './pages/History';
import Overview from './pages/Overview';
import Analysis from './pages/Analysis';
import Build from './pages/Build';
import Frontpage from './pages/Frontpage';
import Team from './pages/Team';
import Suite from './pages/Suite';
import { useStateValue } from './contexts/state';
import './utils/i118n';
import 'normalize.css';
import './index.css';
import { StyledApp } from './App.styles';

const App = () => {
    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(`/data/series/`, {});
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                dispatch({
                    type: 'setBranches',
                    branches: json,
                });
            } catch (error) {
                // console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <StyledApp id="main-app">
            <Suspense fallback="loading">
                <Router>
                    <MainNav />
                    <MainContent>
                        <Switch>
                            <Route path="/series/:seriesId/build/:buildId/suite/:suiteId/test/:testId/history">
                                <Suite />
                            </Route>
                            <Route path="/series/:seriesId/build/:buildId/suite/:suiteId/history">
                                <Suite />
                            </Route>
                            <Route path="/series/:seriesId/build/:buildId/history">
                                <Build />
                            </Route>
                            <Route path="/series/:seriesId/history">
                                <History />
                            </Route>
                            <Route path="/series/:seriesId/overview">
                                <Overview />
                            </Route>
                            <Route path="/series/:seriesId/build/:buildId/overview">
                                <Overview />
                            </Route>
                            <Route path="/series/:seriesId/build/:buildId/analysis">
                                <Analysis />
                            </Route>
                            <Route exact path="/team">
                                <Team />
                            </Route>
                            <Route path="/team/:name">
                                <Team />
                            </Route>
                            <Route path="/">
                                <Frontpage />
                            </Route>
                        </Switch>
                    </MainContent>
                    <Footer />
                </Router>
            </Suspense>
        </StyledApp>
    );
};

export default App;
