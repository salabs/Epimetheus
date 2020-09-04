import styled from 'styled-components';

const baseTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-collapse: collapse;
    padding: 10px 10px;
    /* border: 1px solid black; */
    border: 1px solid #e5e5e5;
    border-radius: 4px 4px 0px 0px;
    -moz-border-radius: 4px 4px 0px 0px;
    text-align: left;
    vertical-align: middle;
    word-wrap: break-word;

    td:first-of-type {
        vertical-align: top;
    }
    /* td:not(:first-child) {
        border-top: none;
    } */
    td.test-result-undefined {
        background: #eee;
    }

    td,
    th {
        border-collapse: collapse;
        padding: 10px 10px;
        /* border: 1px solid black; */
        /* border-top: 1px solid #e5e5e5; */
        text-align: left;
        vertical-align: middle;
        word-wrap: break-word;
    }

    td {
        background: #ffffff;
        /* border-top: 1px solid #e5e5e5; */
    }

    th {
        background: #f0f0f0;
        /* border-top: none; */
    }

    tr {
        border-top: 1px solid #e5e5e5;
    }
`;

const overviewElement = styled.div`
    padding: 10px;
    border-style: solid;
    border-width: thin;
    display: block;
    margin: 20px;
    height: min-content;
`;

export { baseTable, overviewElement };
