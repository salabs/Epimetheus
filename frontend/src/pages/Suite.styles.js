import styled from 'styled-components';
import FA from 'react-fontawesome';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Collection } from '../images/collection-white.svg';
import { ReactComponent as Up } from '../images/chevron-up.svg';
import { ReactComponent as Down } from '../images/chevron-down-white.svg';

export const ParentInfoContainer = styled.div`
    display: flex;
    padding: 20px 0;
`;

export const SuiteNav = styled.div`
    list-style: none;
    padding: 0;
    align-content: center;
    border-right: 1px solid grey;
    flex-grow: 1;

    span {
        float: right;
        margin-left: 12px;
    }
    .active {
        background: #fff;
    }
`;

export const SuiteDiv = styled.div`
    display: flex;
    width: 100%;
    min-width: 140px;
`;

export const StyledLink = styled(NavLink)`
    width: 100%;
    padding: 10px;
    font-weight: bolder;
    cursor: pointer;
    display: inline;
    text-decoration: none;

    :hover {
        background: #ddd;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 0px;
`;

export const StyledFont = styled(FA)`
    margin-right: 8px;
`;

export const FlexGrowColumn = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const ListHeaderColumn = styled.ul`
    list-style: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const ListTitle = styled.div`
    color: grey;
`;

export const SelectedTestDiv = styled.div`
    background: #fff;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
    }
    thead {
        color: grey;
        text-align: left;
        border-bottom: 1px solid grey;
    }
    .table-item {
        padding: 0.25rem 0rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    tr {
        border-bottom: 1px solid #eee;
    }
    .tableLogLevel {
        width: 10%;
    }
    .tableMessage {
        width: 60%;
    }
    .tableTimeStamp {
        width: 30%;
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
        font-family: 'Space Mono';
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
    }
`;

export const DotSpan = styled.span`
    height: 9px;
    width: 9px;
    background-color: var(--tonic-grey);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    left: -7px;
`;

export const TestStatusRow = styled.div`
    display: inline-flex;
    justify-content: space-evenly;
    flex-direction: row;
    width: 80%;
    align-items: center;

    span {
        color: var(--evidence-grey);
    }
`;

export const SvgStatus = styled.span`
    position: relative;
    top: -2px;
`;

export const TagContainer = styled.span`
    border: 1px solid var(--evidence-grey);
    padding: 0 8px;
    border-radius: 16px;
    font-size: 10px;
`;
