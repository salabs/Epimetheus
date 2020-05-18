// eslint-disable-next-line
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ThemeContext from '../contexts/themeContext';
import packageJson from '../../package.json';
import { useTranslation } from 'react-i18next';

const MainNav = () => {
    const theme = useContext(ThemeContext);
    const [t] = useTranslation(['mainnav']);
    const mainNavStyles = css`
        flex: 0 0 280px;
        @media only screen and (max-width: 999px) {
            flex: 0 0 120px;
        }
        h2 {
            padding: 20px 20px 0px 20px;
            @media only screen and (max-width: 999px) {
                display: block;
                width: 0;
                height: 40px;
                padding: 0;
                margin: 0;
                overflow: hidden;
                &:after {
                    display: block;
                    width: 100px;
                    top: 15px;
                    left: 10px;
                    content: 'Epi';
                    position: absolute;
                }
            }
        }
        p {
            padding: 20px 20px 0px 20px;
            @media only screen and (max-width: 999px) {
                display: block;
                width: 0;
                height: 40px;
                padding: 0;
                margin: 0;
                overflow: hidden;
                &:after {
                    display: none;
                }
            }
        }
        ul {
            list-style-type: none;
            padding: 0;
            li {
                padding: & + li {
                    padding-top: ${theme.spacing.xs / 2}px;
                }

                a {
                    display: block;
                    width: 100%;
                    padding: 15px 20px;
                    @media only screen and (max-width: 999px) {
                        padding: 15px 20px 15px 10px;
                    }
                    transition: 0.33s background-color;
                    &:hover,
                    &:active {
                        background-color: #ccc;
                        transition: 0.1s background-color;
                    }
                }
                &.nav-github {
                    font-size: 1.2em;
                    margin-top: 1em;
                    font-weight: bold;
                }
            }
            a.active {
                font-weight: bold;
                background-color: #ccc;
            }
        }
    `;
    return (
        <nav id="main-nav" css={mainNavStyles}>
            <h2 className="logo">{t('logo')}</h2>
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/">
                        {t('help')}
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/history/">
                        {t('history')}
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/team/">
                        {t('team')}
                    </NavLink>
                </li>
                <li className="nav-github">
                    <a href="https://github.com/salabs/Epimetheus">
                        {t('github')}
                    </a>
                </li>
            </ul>
            <p>
                {/* TODO: needs better design!*/}
                {t('version')} {packageJson.version}
            </p>
        </nav>
    );
};

export default MainNav;
