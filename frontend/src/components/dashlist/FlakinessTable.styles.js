import styled from 'styled-components';

export const TableContainer = styled.div`
    border-top: solid;
    border-color: var(--tonic-grey);
    width: 100%;
    max-height: 400px;
    overflow-y: scroll;

    button {
        margin: var(--space-16) var(--space-8) var(--space-16) 0;
    }
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
