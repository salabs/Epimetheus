// eslint-disable-next-line
import React, { useContext } from 'react';
import Body from './Body';
import { baseTable } from '../../styles/baseComponents';
import styled from 'styled-components';

const StyledTable = styled(baseTable)`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;

    thead th:nth-of-type(1) {
        width: 10%;
    }

    thead th:nth-of-type(2) {
        width: 2.8%;
    }

    thead th:nth-of-type(3) {
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
    overflow: auto;
`;

const Container = styled.div`
    overflow: auto;
`;

const Table = ({ id }) => {
    return (
        <Container>
            <StyledTable id="last-run-table">
                <thead>
                    <tr>
                        <th>Suitename</th>
                        <th className="centerTableCellContent">Status</th>
                        <th>Tests</th>
                        <th>Error messages</th>
                        <th className="test-time-row">Time</th>
                        <th className="centerTableCellContent">Flakiness</th>
                    </tr>
                </thead>
                <tbody>
                    <Body id={id} />
                </tbody>
            </StyledTable>
        </Container>
    );
};

export default Table;
