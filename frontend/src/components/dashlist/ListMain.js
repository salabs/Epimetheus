import React, { useState } from 'react';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
import styled from 'styled-components';

const StyledListContainer = styled.div`
    padding: 10px;
    display: inline-grid;
    min-width: 100%;
    height: 500px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.6fr 0.55fr 6fr;
    grid-template-areas:
        'selectorbox selectorbox'
        'amount amount'
        'table table';
`;

const TableSelectors = styled.div`
    grid-area: selectorbox;
`;

const TableButtons = styled.button`
    padding: 10px;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 2px;
    background-color: ${props => props.color};
    color: var(--gradient-black);
    border: 1px solid var(--gradient-black);
    outline: none;
`;
const DashboardList = () => {
    const [window, setWindow] = useState('flakiness');
    return (
        <StyledListContainer id="list-container">
            <TableSelectors id="selector-buttons">
                <TableButtons
                    className="selector-button"
                    color={
                        window === 'flakiness'
                            ? 'var(--evidence grey)'
                            : 'var(--nero-white)'
                    }
                    onClick={() => setWindow('flakiness')}
                >
                    Stability
                </TableButtons>
                <TableButtons
                    className="selector-button"
                    color={
                        window === 'failures'
                            ? 'var(--evidence grey)'
                            : 'var(--nero-white)'
                    }
                    onClick={() => setWindow('failures')}
                >
                    Failures
                </TableButtons>
            </TableSelectors>
            {window === 'flakiness' ? <FlakinessTable /> : <FailureTable />}
        </StyledListContainer>
    );
};

export default DashboardList;
