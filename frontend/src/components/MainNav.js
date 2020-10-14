// eslint-disable-next-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const NavBar = styled.nav`
    background: var(--titan-green);
    color: var(--nero-white);
    display: flex;
    align-items: center;
    min-height: 100px;
`;

const StyledH2 = styled.h2`
    padding: 0px 40px 0px 40px;
    font-family: 'Hack' !important;
    letter-spacing: 1px;
    @media only screen and (max-width: 540px) {
        width: 0;
        overflow: hidden;
        display: block;
    }
`;

const LinkContainer = styled.div`
    a {
        margin: 0 15px 0 15px;
        color: var(--nero-white) !important;
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
        text-decoration: none;
        border-bottom: none;
    }

    a:hover,
    .about:hover,
    .team:hover {
        background: var(--titan-green);
        border-bottom: 3px solid var(--titan-green-darkest);
    }

    .about {
        border-bottom: ${props => !props.team && '3px solid var(--nero-white)'};
    }

    .team {
        border-bottom: ${props => props.team && '3px solid var(--nero-white)'};
    }

    @media only screen and (max-width: 540px) {
        margin-left: 10px;
        a {
            margin: 0 5px 0 5px;
        }
    }
`;

const MainNav = () => {
    const [t] = useTranslation(['mainnav']);

    const location = useLocation();
    const team =
        location.pathname.includes('team') ||
        location.pathname.includes('series');

    return (
        <NavBar id="main-nav">
            <StyledH2 className="logo">{t('logo')}</StyledH2>
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
    );
};

export default MainNav;
