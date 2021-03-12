import { baseTable } from '../../styles/baseComponents';
import styled from 'styled-components';

export const StyledTable = styled(baseTable)`
    table-layout: initial;
    overflow: auto;
    border: 1px solid var(--hermanni-grey);
    border-radius: 8px;
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

    thead th:nth-of-type(1) {
        width: 10%;
        text-align: left !important;
    }

    thead th:nth-of-type(2) {
        width: 2.8%;
    }

    thead th:nth-of-type(3) {
        text-align: left !important;
        width: 10%;
    }

    thead th:nth-of-type(4) {
        width: 8%;
    }

    thead th:nth-of-type(5) {
        width: 3%;
    }

    thead th:nth-of-type(6) {
        width: 4%;
    }
`;

export const HeaderRow = styled.tr`
    border-top: none !important;
`;
