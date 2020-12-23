// eslint-disable-next-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { NavBar, LinkContainer, SiteLogo } from './MainNav.styles';

const MainNav = () => {
    const [t] = useTranslation(['mainnav']);

    const location = useLocation();
    const team =
        location.pathname.includes('team') ||
        location.pathname.includes('series');

    return (
        <header>
            <NavBar id="main-nav">
                <SiteLogo className="logo">{t('logo')}</SiteLogo>
                <LinkContainer team={team}>
                    <NavLink
                        exact
                        activeClassName="active"
                        to="/"
                        className="about"
                    >
                        {t('help')}
                    </NavLink>
                    <NavLink activeClassName="active" to="/team" className="team">
                        {t('team')}
                    </NavLink>
                    <a href="https://github.com/salabs/Epimetheus">{t('github')}</a>
                </LinkContainer>
            </NavBar>
        </header>
    );
};

export default MainNav;
