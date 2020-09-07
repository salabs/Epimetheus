// eslint-disable-next-line
import React from 'react';
import Body from './Body';
import { StyledTable, Container } from './Table.styles';

const Table = ({ id }) => {
    return (
        <Container>
            <StyledTable id="last-run-table">
                <thead>
                    <tr>
                        <th>Suitename</th>
                        <th className="centerTableCellContent">Status</th>
                        <th>Test(s)</th>
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
