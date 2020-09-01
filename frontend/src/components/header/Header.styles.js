import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const LinkContainer = styled.div`
    padding: 10px 0;

    a:nth-child(2) {
        margin-left: 10px;
    }
`;

// eslint-disable-next-line no-unused-vars
export const StyledLink = styled(({ overview, ...props }) => (
    <NavLink {...props} />
))`
    width: 100px;
    margin: 10px 15px 10px 0;
    cursor: pointer;
    color: var(--titan-green);
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
`;

export const OverviewLink = styled(StyledLink)`
    color: ${props => props.overview && 'var(--pirlo-blue) !important'};
    border-bottom: ${props => props.overview && '4px solid var(--pirlo-blue)'};
`;

export const HistoryLink = styled(StyledLink)`
    color: ${props => !props.overview && 'var(--pirlo-blue) !important'};
    border-bottom: ${props => !props.overview && '4px solid var(--pirlo-blue)'};
`;
