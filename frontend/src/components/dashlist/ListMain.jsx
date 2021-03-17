import React, { useState } from 'react';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
import { StyledListContainer, TableSelectors } from './ListMain.styles';
import { ToggleButton } from '../buttons/button.styles';

const DashboardList = () => {
    const [window, setWindow] = useState('flakiness');
    return (
        <StyledListContainer id="list-container">
            <TableSelectors id="selector-buttons">
                <ToggleButton
                    className={window === 'flakiness' ? 'selected' : ''}
                    onClick={() => setWindow('flakiness')}
                >
                    Stability
                </ToggleButton>
                <ToggleButton
                    className={window === 'failures' ? 'selected' : ''}
                    onClick={() => setWindow('failures')}
                >
                    Failures
                </ToggleButton>
            </TableSelectors>
            {window === 'flakiness' ? <FlakinessTable /> : <FailureTable />}
        </StyledListContainer>
    );
};

export default DashboardList;
