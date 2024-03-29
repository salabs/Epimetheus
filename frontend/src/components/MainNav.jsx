import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ExternalLink from './externalLink/ExternalLink';
import { NavBar, LinkContainer, SiteLogo } from './MainNav.styles';

const MainNav = () => {
    const [t] = useTranslation(['mainnav']);

    const location = useLocation();
    const team =
        location.pathname.includes('team') ||
        location.pathname.includes('series');
    const compare = location.pathname.includes('compare');

    return (
        <header>
            <NavBar robot_id="main-nav" id="main-nav">
                <SiteLogo className="logo">{t('logo')}</SiteLogo>
                <LinkContainer team={team}>
                    <NavLink
                        exact
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        {t('help')}
                    </NavLink>
                    <NavLink to="/team" className={team ? 'active' : ''}>
                        {t('team')}
                    </NavLink>
                    <NavLink to="/compare" className={compare ? 'active' : ''}>
                        {t('compare')}
                    </NavLink>
                    <ExternalLink
                        url="https://github.com/salabs/Epimetheus"
                        label={t('github')}
                        color="nero white"
                    />
                </LinkContainer>
            </NavBar>
        </header>
    );
};

export default MainNav;
