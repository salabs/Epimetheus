import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Collection } from '../../images/collection-white.svg';
import { ReactComponent as Up } from '../../images/chevron-up-white.svg';
import { ReactComponent as Down } from '../../images/chevron-down-white.svg';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0px;

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
    border-radius: 48px;
    width: 100%;
    color: var(--nero-white);
    border: 0;
    text-align: left;
    padding: 0;

    &:hover:enabled {
        background-color: var(--titan-green);
        color: var(--nero-white);
        text-decoration: none;
    }

    h2 {
        font-size: 20px;
        font-family: 'Hack';
        font-weight: normal;
        text-transform: none;
        letter-spacing: -0.04em;
        flex: 20;
        padding-left: 56px;
        margin: 0;
    }

    & > p {
        flex: 3;
        padding-right: 30px;
        white-space: nowrap;
    }
`;

export const SvgCollection = styled(Collection)`
    position: relative;
    left: 24px;
`;

export const SvgDown = styled(Down)`
    position: relative;
    right: 24px;
`;

export const SvgUp = styled(Up)`
    position: relative;
    right: 24px;
`;

export const TestListContainer = styled.div`
    padding-left: 24px;

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
    padding: 0 4px;
    font-weight: bolder;
    text-decoration: none;
    flex: 2;
    color: ${props => props.isselected && 'var(--pirlo-blue) !important'};
    outline-offset: -1px;

    :hover {
        color: var(--titan-green-darker);
    }
`;

export const SvgStatus = styled.span`
    position: relative;
    top: -2px;
    left: 8px;
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

export const Tag = styled.span`
    border: 1px solid var(--evidence-grey);
    padding: 0 8px;
    border-radius: 8px;
    font-size: 10px;
    margin: 2px 8px;
    line-height: 14px;
`;
