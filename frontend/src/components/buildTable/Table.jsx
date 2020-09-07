// eslint-disable-next-line
import React from 'react';
import Body from './Body';
import { StyledTable, HeaderRow, Container } from './Table.styles';

const Table = ({ id }) => {
    return (
        <Container>
            <StyledTable id="last-run-table">
                <thead>
                    <HeaderRow>
                        <th>Suitename</th>
                        <th className="centerTableCellContent">Status</th>
                        <th>Test(s)</th>
                        <th>Error messages</th>
                        <th className="test-time-row">Time</th>
                        <th className="centerTableCellContent">Flakiness</th>
                    </HeaderRow>
                </thead>
                <tbody>
                    <Body id={id} />
                </tbody>
            </StyledTable>
        </Container>
    );
};

export default Table;
