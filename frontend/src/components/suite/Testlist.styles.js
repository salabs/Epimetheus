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
    :hover {
        cursor: pointer;
    }

    .Open,
    .Close {
        max-height: 0;
        overflow-y: hidden;
    }

    .Open {
        max-height: 100%;
    }
`;

export const HeaderContainer = styled.div`
    background: var(--titan-green);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 48px;
    width: 100%;
    color: var(--nero-white);

    h3 {
        font-size: 20px;
        font-family: 'Hack';
        letter-spacing: -0.04em;
        font-style: normal;
        font-weight: normal;
        flex: 20;
        padding-left: 56px;
    }

    p {
        flex: 2;
    }
`;

export const SvgCollection = styled(Collection)`
    position: relative;
    left: 24px;
`;

export const SvgDown = styled(Down)`
    color: white;
    flex: 1;
`;

export const SvgUp = styled(Up)`
    color: white;
    flex: 1;
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
        width: 32px;
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
        width: 33px;
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
    width: 80%;
    align-items: center;

    span {
        color: var(--evidence-grey);
    }
`;

// eslint-disable-next-line no-unused-vars
export const StyledLink = styled(({ isselected, ...props }) => (
    <NavLink {...props} />
))`
    padding: 4px;
    font-weight: bolder;
    cursor: pointer;
    display: inline;
    text-decoration: none;
    flex: 2;
    color: ${props => props.isselected && 'var(--pirlo-blue) !important'};

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

    @media only screen and (max-width: 1300px) {
        flex: 2;
    }

    @media only screen and (max-width: 1024px) {
        flex: 1;
    }
`;

export const Tag = styled.span`
    border: 1px solid var(--evidence-grey);
    padding: 0 8px;
    border-radius: 8px;
    font-size: 10px;
    margin: 0 8px;
`;
