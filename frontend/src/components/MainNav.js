// eslint-disable-next-line
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import packageJson from '../../package.json';

const Sidebar = styled.nav`
    background: var(--titan-green);
    color: var(--nero-white);
    display: flex;
    align-items: center;
    min-height: 100px;
    /* @media only screen and (max-width: 999px) {
        flex: 0 0 120px;
    } */
`;

const StyledH2 = styled.h2`
    padding: 0px 40px 0px 40px;
    font-family: 'Space Mono' !important;
    letter-spacing: 1px;
    /* KÄY TÄMÄ VIELÄ LÄPI*/
    @media only screen and (max-width: 768px) {
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
            content: 'EPI';
            position: absolute;
        }
    }
`;

const LinkContainer = styled.div`
    a {
        margin: 0 15px 0 15px;
        color: var(--nero-white);
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
        text-decoration: none;
        border-bottom: none;
    }

    .about {
        border-bottom: ${props => !props.team && '3px solid var(--nero-white)'};
    }

    .team {
        border-bottom: ${props => props.team && '3px solid var(--nero-white)'};
    }
`;

const StyledParagraph = styled.p`
    padding: 20px 20px 0px 20px;
    @media only screen and (max-width: 768px) {
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
`;

const MainNav = () => {
    const [t] = useTranslation(['mainnav']);

    const location = useLocation();
    const team = location.pathname.includes('team');

    return (
        <Sidebar id="main-nav">
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
            <StyledParagraph>
                {/* TODO: needs better design!*/}
                {t('version')} {packageJson.version}
            </StyledParagraph>
        </Sidebar>
    );
};

export default MainNav;
