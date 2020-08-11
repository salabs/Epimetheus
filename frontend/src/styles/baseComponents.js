import styled from 'styled-components';

const baseTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-collapse: collapse;
    padding: 10px 10px;
    border: 1px solid black;
    text-align: left;
    vertical-align: middle;
    word-wrap: break-word;

    td:first-of-type {
        vertical-align: top;
    }
    td.test-result-undefined {
        background: #eee;
    }

    td {
        border-collapse: collapse;
        padding: 10px 10px;
        border: 1px solid black;
        text-align: left;
        vertical-align: middle;
        word-wrap: break-word;
        background: #ffffff;
    }

    th {
        border-collapse: collapse;
        padding: 10px 10px;
        border: 1px solid black;
        text-align: left;
        vertical-align: middle;
        word-wrap: break-word;
        background: #ddd;
    }
`;

const dashboardElement = styled.div`
    padding: 10px;
    border-style: solid;
    border-width: thin;
    display: block;
    margin: 20px;
    height: min-content;
`;

export { baseTable, dashboardElement };
