import { baseTable } from '../../styles/baseComponents';
import styled from 'styled-components';

export const StyledTable = styled(baseTable)`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;

    thead th:nth-of-type(1) {
        width: 10%;
    }

    thead th:nth-of-type(2) {
        width: 2.8%;
        text-align: center !important;
    }

    thead th:nth-of-type(3) {
        width: 10%;
    }

    thead th:nth-of-type(4) {
        width: 8%;
    }

    thead th:nth-of-type(5) {
        width: 3%;
        text-align: center !important;
    }

    thead th:nth-of-type(6) {
        width: 4%;
        text-align: center !important;
    }
    overflow: auto;
`;

export const Container = styled.div`
    overflow: auto;
`;
