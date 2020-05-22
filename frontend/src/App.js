// eslint-disable-next-line
import React, { useState, useEffect, Suspense } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './styles/theme';
import ThemeContext from './contexts/themeContext';
import MainContent from './components/MainContent';
import MainNav from './components/MainNav';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Build from './pages/Build';
import Frontpage from './pages/Frontpage';
import Team from './pages/Team';
import Suite from './pages/Suite';
import { useStateValue } from './contexts/state';
//import { useParams } from 'react-router';
import './utils/i118n';

import 'normalize.css';
import './index.css';

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
                    branches: json
                });
            } catch (error) {
                // console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);

    const appStyles = css`
        display: flex;
        min-height: 100vh;
        width: 100%;
        ${theme.testTheme.container} .login-btn {
            padding: 10px;
            margin-bottom: 20px;
        }
        a {
            color: ${theme.testTheme.linkColor};
        }
        a:active,
        a:hover {
            color: ${theme.testTheme.linkColor};
        }
        a.skip-main {
            left: -999px;
            position: absolute;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
            z-index: -999;
        }
        a.skip-main:focus,
        a.skip-main:active {
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
        ,
        select:focus,
        input:focus {
            outline: 1px solid ${theme.testTheme.linkColor};
        }
    `;

    return (
        <ThemeContext.Provider value={theme}>
            <div id="main" css={appStyles}>
                <Suspense fallback="loading">
                    <Router>
                        <a className="skip-main" href="#main-content">
                            Skip to main content
                        </a>
                        <MainNav />
                        <MainContent>
                            <Switch>
                                <Route path="/series/:seriesId/build/:buildId/suite/:suiteId/test/:testId">
                                    <Suite />
                                </Route>
                                <Route path="/series/:seriesId/build/:buildId/suite/:suiteId">
                                    <Suite />
                                </Route>
                                <Route path="/series/:seriesId/build/:buildId">
                                    <Build />
                                </Route>
                                <Route path="/series/:seriesID/history">
                                    <History />
                                </Route>
                                <Route path="/series/:seriesID/dashboard">
                                    <Dashboard />
                                </Route>
                                <Route path="/series/:seriesID/build/:buildId/dashboard">
                                    <Dashboard />
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
                    </Router>
                </Suspense>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
