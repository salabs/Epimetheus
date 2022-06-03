// eslint-disable-next-line
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import Analysis from './pages/Analysis';
import Frontpage from './pages/Frontpage';
import Team from './pages/Team';
import Suite from './pages/Suite';
import Comparison from './pages/Comparison';
import Series from './pages/Series';
import Build from './pages/Build';
import Search from './pages/Search';
import './utils/i118n';
import 'normalize.css';
import './index.css';
import { StyledApp } from './App.styles';

const App = () => {
    return (
        <StyledApp id="main-app">
            <Suspense fallback="loading">
                <Router>
                    <MainNav />
                    <MainContent>
                        <Switch>
                            <Route exact path="/team">
                                <Team />
                            </Route>
                            <Route exact path="/team/:name">
                                <Team />
                            </Route>
                            <Route path="/team/:name/series/:seriesId/build/:buildId/suite/:suiteId/test/:testId/history">
                                <Suite />
                            </Route>
                            <Route path="/team/:name/series/:seriesId/build/:buildId/suite/:suiteId/history">
                                <Suite />
                            </Route>
                            <Route path="/team/:name/series/:seriesId/build/:buildId/analysis">
                                <Analysis />
                            </Route>
                            <Route path="/team/:name/series/:seriesId/build/:buildId">
                                <Build />
                            </Route>
                            <Route path="/team/:name/series/:seriesId">
                                <Series />
                            </Route>
                            <Route path="/compare/:seriesId/:buildId/to/:seriesId2/:buildId2">
                                <Comparison />
                            </Route>
                            <Route path="/compare">
                                <Comparison />
                            </Route>
                            <Route path="/search">
                                <Search />
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
