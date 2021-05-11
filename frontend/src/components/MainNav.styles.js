import styled from 'styled-components';
import React from 'react';

export const NavBar = styled(props => <nav {...props} />).attrs(
    ({ customProperty }) => ({
        customProperty,
    })
)`
    background-color: var(--titan-green);
    color: var(--nero-white);
    display: flex;
    align-items: center;
    height: var(--space-80);
`;

export const SiteLogo = styled.div`
    margin: 0 var(--space-24) 0 var(--space-40);
    font-family: 'Hack';
    letter-spacing: 1px;
    font-size: 30px;
    font-weight: 700;

    @media only screen and (max-width: 768px) {
        width: var(--space-16);
        margin-right: 0;
        overflow: hidden;
    }
`;

export const LinkContainer = styled.div`
    a {
        color: var(--nero-white);
        font-size: var(--space-16);
        line-height: var(--space-24);
        font-weight: bold;
        text-decoration: none;
        border-bottom: none;
        margin: 0 var(--space-16) 0 var(--space-16);
        padding-bottom: var(--space-4);

        &:hover {
            background-color: var(--titan-green);
            border-bottom: var(--space-4) solid var(--titan-green-darkest);
        }

        &:focus {
            outline-color: var(--nero-white);
        }

        &.active {
            border-bottom: var(--space-4) solid var(--nero-white);
        }
    }

    @media only screen and (max-width: 540px) {
        margin-left: var(--space-4);
    }
`;
