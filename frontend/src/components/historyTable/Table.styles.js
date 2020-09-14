import styled from 'styled-components';

export const TableStyled = styled.table`
    overflow: auto;
    clear: both;
    border-collapse: separate !important;
    border-spacing: 0;
    table-layout: fixed;
    border: 1px solid #e5e5e5;
    border-radius: 4px 4px 0px 0px;
    text-align: left;
    vertical-align: top;

    thead {
        background: var(--hermanni-grey);
    }

    td {
        border-top: 1px solid #e5e5e5;
    }

    th {
        padding: 10px;
        text-align: left;
        vertical-align: middle;
    }

    .centerTableCellContent {
        text-align: center;
        vertical-align: middle;
    }
`;
