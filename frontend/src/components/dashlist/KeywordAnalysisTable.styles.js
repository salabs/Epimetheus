import styled from 'styled-components';

export const TableContainer = styled.div`
    border-top: solid;
    border-color: #ddd;
    width: 100%;
    max-height: 600px;
    overflow-y: scroll;
    grid-area: table;
`;

export const StyledTable = styled.table`

    th {
        border-bottom: 1px solid #ddd;
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }
    td {
        border-bottom: 1px solid #ddd;
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }
`;

export const HighlightedButton = styled.button`
    background-color: ${props => props.color};
    color: var(--gradient-black);
    border: 1px solid var(--gradient-black);
    outline: none;
`;
