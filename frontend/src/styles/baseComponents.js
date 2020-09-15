import styled from 'styled-components';

const baseTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    padding: 5px 5px;
    text-align: left;
    vertical-align: middle;
    word-wrap: break-word;

    thead {
        background: var(--hermanni-grey);
    }

    td {
    }
    td.test-result-undefined {
        background: #eee;
    }

    td,
    th {
        padding: 5px 5px;
        text-align: center;
        vertical-align: middle;
        word-wrap: break-word;
    }

    td {
        background: #ffffff;
        vertical-align: top;
    }

    tr {
        border-top: 1px solid #e5e5e5;
    }
    a {
        text-decoration: none;
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
