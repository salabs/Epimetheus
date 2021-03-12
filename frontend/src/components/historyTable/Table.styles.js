import styled from 'styled-components';

export const TableWrapper = styled.div`
    max-width: calc(100% + 40px);
    position: relative;
    margin: 0 -20px;
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 20px;
        height: 100%;
        background-image: linear-gradient(
            to right,
            white,
            rgba(255, 255, 255, 0.001)
        );
        z-index: 1;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: '';
        width: 20px;
        height: 100%;
        background-image: linear-gradient(
            to left,
            white,
            rgba(255, 255, 255, 0.001)
        );
    }
`;

export const OverflowWrapper = styled.div`
    display: inline-block;
    overflow-x: auto;
    position: relative;
    max-width: 100%;
    width: 100%;
    padding: 0 20px;
`;

export const TableStyled = styled.table`
    clear: both;
    border-collapse: separate !important;
    border-spacing: 0;
    border: 1px solid var(--hermanni-grey);
    border-radius: 8px;
    text-align: left;
    vertical-align: top;
    position: relative;
    width: 100%;

    &::after {
        content: '';
        position: absolute;
        right: -20px;
        top: 0;
        display: inline-block;
        width: 20px;
        height: 100%;
    }

    thead {
        background: var(--hermanni-grey);
    }

    thead th {
        padding: 8px;
        text-align: left;
    }

    tbody td {
        border-top: 1px solid var(--hermanni-grey);
        vertical-align: top;
    }

    .centerTableCellContent {
        text-align: center;
    }
`;
