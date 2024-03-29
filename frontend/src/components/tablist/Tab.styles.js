import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Tabs = styled.nav`
    display: block;
    border-bottom: 1px solid var(--tonic-grey);
`;

export const TabLink = styled(({ ...props }) => <NavLink {...props} />)`
    display: inline-block;
    height: 37px;
    background: var(--nero-white);
    color: var(--titan-green);
    position: relative;
    top: 3px;
    margin-right: var(--space-24);
    font-size: var(--space-16);
    font-weight: bold;
    line-height: var(--space-24);
    text-decoration: none;

    &.active {
        color: var(--pirlo-blue);
        border-bottom: var(--space-4) solid var(--pirlo-blue);
        height: var(--space-40);
        background: var(--nero-white);
    }

    &:hover:not(.active) {
        color: var(--titan-green);
        border-bottom: var(--space-4) solid var(--tonic-grey);
        height: var(--space-40);
        background: var(--nero-white);
    }
`;
