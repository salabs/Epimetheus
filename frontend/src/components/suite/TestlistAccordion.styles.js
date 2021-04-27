import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: var(--space-40) 0;

    .open,
    .close {
        visibility: hidden;
        max-height: 0;
        overflow-y: hidden;
        transition: all 0.25s ease-in-out;
    }

    .open {
        visibility: visible;
        max-height: 5000px;
    }
`;

export const HeaderContainer = styled.button`
    background: var(--titan-green);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border-radius: var(--space-48);
    width: 100%;
    color: var(--nero-white);
    border: 0;
    text-align: left;
    padding: 0;

    h2 {
        font-size: 20px;
        font-family: 'Hack';
        font-weight: normal;
        text-transform: none;
        letter-spacing: -0.04em;
        line-height: var(--space-40);
        flex: 20;
        padding: var(--space-8) 0 var(--space-8) 56px;
        margin: 0;
    }

    & > p {
        flex: 3;
        padding-right: 30px;
        white-space: nowrap;
    }

    svg {
        &:first-of-type {
            position: relative;
            left: var(--space-24);
        }
        &:last-of-type {
            position: relative;
            right: var(--space-24);
        }
    }
`;

export const TestListContainer = styled.div`
    padding-left: var(--space-24);

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-left: 10px;
    }

    ul li {
        margin: 0;
        padding: 0 7px;
        border-left: 1px solid var(--tonic-grey);
    }

    ul li:last-child {
        border-left: none;
    }

    ul li:before {
        position: relative;
        top: -0.3em;
        height: 2.4em;
        width: 27px;
        color: white;
        border-bottom: 1px solid var(--tonic-grey);
        content: '';
        display: inline-block;
        left: -7px;
    }

    ul li:first-child:before {
        height: 3.2em;
    }

    ul li:last-child:before {
        border-left: 1px solid var(--tonic-grey);
    }
`;

export const DotSpan = styled.span`
    height: 9px;
    width: 9px;
    background-color: ${props =>
        props.isselected ? 'var(--pirlo-blue)' : 'var(--tonic-grey)'};
    border-radius: 50%;
    display: inline-block;
    position: relative;
    left: -7px;
`;

export const TestStatusRow = styled.div`
    display: inline-flex;
    flex-direction: row;
    width: calc(100% - 42px);
    align-items: center;

    span {
        color: var(--evidence-grey);
    }
`;

// eslint-disable-next-line no-unused-vars
export const StyledLink = styled(({ isselected, ...props }) => (
    <NavLink {...props} />
))`
    padding: 0 var(--space-4);
    font-weight: bolder;
    text-decoration: none;
    flex: 2;
    color: ${props => props.isselected && 'var(--pirlo-blue)'};
    outline-offset: -2px;
`;

export const SvgStatus = styled.span`
    position: relative;
    top: -2px;
    left: var(--space-8);
    flex: 0.5;
`;

export const TimeContainer = styled.span`
    flex: 0.5;
`;

export const TagContainer = styled.span`
    flex: 3;
    display: flex;

    @media only screen and (max-width: 1300px) {
        flex: 2;
    }

    @media only screen and (max-width: 1024px) {
        flex: 1;
        flex-wrap: wrap;
    }
`;
