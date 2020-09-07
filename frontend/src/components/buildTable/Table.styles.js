import { baseTable } from '../../styles/baseComponents';
import styled from 'styled-components';

export const StyledTable = styled(baseTable)`
    table-layout: fixed;
    border-collapse: collapse;
    overflow: auto;

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

export const Container = styled.div`
    overflow: hidden;
    border: 1px solid #e5e5e5;
    border-radius: 4px 4px 0px 0px;
`;

export const HeaderRow = styled.tr`
    border-top: none !important;
`;
