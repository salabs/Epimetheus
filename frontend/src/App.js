// eslint-disable-next-line
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './styles/theme';
import ThemeContext from './contexts/themeContext';
import MainContent from './components/MainContent';
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import History from './pages/History';
import Overview from './pages/Overview';
import Build from './pages/Build';
import Frontpage from './pages/Frontpage';
import Team from './pages/Team';
import Suite from './pages/Suite';
import { useStateValue } from './contexts/state';
import './utils/i118n';
import 'normalize.css';
import './index.css';
import styled from 'styled-components';

const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background-color: var(--nero-white);
    color: #222;
    border: 1px solid #ccc;
    p {
        line-height: 1.6;
    }

    a {
        color: var(--titan-green);
    }
    select:focus,
    input:focus {
        outline: 1px solid ${theme.testTheme.linkColor};
    }
`;

const SkipMain = styled.a`
    left: -999px;
    position: absolute;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -999;
    :focus,
    :active {
        background-color: #fff;
        left: auto;
        top: auto;
        width: 30%;
        height: auto;
        overflow: auto;
        margin: 10px 35%;
        padding: 5px;
        border: 1px solid black;
        text-align: center;
        z-index: 999;
    }
`;

const App = () => {
    // eslint-disable-next-line
    const [{ selectedBranchState, amountOfBuilds }, dispatch] = useStateValue();
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
        <ThemeContext.Provider value={theme}>
            <StyledApp id="main">
                <Suspense fallback="loading">
                    <Router>
                        <SkipMain className="skip-main" href="#main-content">
                            Skip to main content
                        </SkipMain>
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
        </ThemeContext.Provider>
    );
};

export default App;
