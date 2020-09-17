import styled from 'styled-components';
import FA from 'react-fontawesome';
import { NavLink } from 'react-router-dom';

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
    color: black !important;
    cursor: pointer;
    display: inline;
    text-decoration: none;

    :hover {
        background: #ddd;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
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
