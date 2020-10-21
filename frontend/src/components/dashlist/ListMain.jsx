import React, { useState } from 'react';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
import {
    StyledListContainer,
    TableSelectors,
    TableButtons,
} from './ListMain.styles';

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
