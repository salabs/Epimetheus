import styled from 'styled-components';

export const TableContainer = styled.div`
    border-top: solid;
    border-color: var(--tonic-grey);
    max-width: 100%;
    grid-area: table;
    max-height: 100%;
    overflow-y: scroll;
    padding-top: var(--space-8);
`;

export const StyledTable = styled.table`
    th:nth-of-type(1) {
        width: 70%;
    }
    th:nth-of-type(2) {
        width: 20%;
    }
    th:nth-of-type(3) {
        width: 10%;
    }

    th {
        border-bottom: 1px solid var(--tonic-grey);
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }
    td {
        border-bottom: 1px solid var(--tonic-grey);
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }
`;
