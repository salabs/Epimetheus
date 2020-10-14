import styled from 'styled-components';

export const TableContainer = styled.div`
    padding: 0 198px 64px 198px;

    @media only screen and (max-width: 1280px) {
        padding: 0 108px 24px 108px;
    }
`;

export const TableStyled = styled.table`
    overflow: auto;
    clear: both;
    border-collapse: separate !important;
    border-spacing: 0;
    table-layout: fixed;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    text-align: left;
    vertical-align: top;

    thead {
        background: var(--hermanni-grey);
    }

    thead th {
        padding: 8px;
        text-align: left;
    }

    tbody td {
        border-top: 1px solid #e5e5e5;
        vertical-align: top;
    }

    .centerTableCellContent {
        text-align: center;
    }
`;
