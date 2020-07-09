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

const baseTableHeader = styled.th`
    border-collapse: collapse;
    padding: 10px 10px;
    border: 1px solid black;
    text-align: left;
    vertical-align: middle;
    word-wrap: break-word;
    background: #ddd;
`;

const baseTableData = styled.td`
    border-collapse: collapse;
    padding: 10px 10px;
    border: 1px solid black;
    text-align: left;
    vertical-align: middle;
    word-wrap: break-word;
    background: #ffffff;
`;

export { baseTable, baseTableHeader, baseTableData };
