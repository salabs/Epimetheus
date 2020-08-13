// eslint-disable-next-line
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import packageJson from '../../package.json';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledH2 = styled.h2`
    padding: 0px 20px 0px 20px;
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
            content: 'Epi';
            position: absolute;
        }
    }
`;

const Sidebar = styled.nav`
    flex: 0 0 240px;
    @media only screen and (max-width: 999px) {
        flex: 0 0 120px;
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

const StyledLink = styled(NavLink)`
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
`;

const GithubLink = styled.a`
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
    margin-top: 1em;
    font-weight: bold;
`;

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListElement = styled.li`
    font-size: 16px;
    padding: & + li {
        padding-top: 20px;
    }
    padding-left: ${props => (props.suburl ? `5%` : `0`)};
`;

const MainNav = () => {
    const [t] = useTranslation(['mainnav']);

    return (
        <Sidebar id="main-nav">
            <StyledH2 className="logo">{t('logo')}</StyledH2>
            <StyledList>
                <ListElement>
                    <StyledLink exact activeClassName="active" to="/">
                        {t('help')}
                    </StyledLink>
                </ListElement>
                <ListElement>
                    <StyledLink activeClassName="active" to="/team">
                        {t('team')}
                    </StyledLink>
                </ListElement>
                <ListElement className="nav-github">
                    <GithubLink href="https://github.com/salabs/Epimetheus">
                        {t('github')}
                    </GithubLink>
                </ListElement>
            </StyledList>
            <StyledParagraph>
                {/* TODO: needs better design!*/}
                {t('version')} {packageJson.version}
            </StyledParagraph>
        </Sidebar>
    );
};

export default MainNav;
