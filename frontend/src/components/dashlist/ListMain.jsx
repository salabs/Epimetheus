import React, { useState } from 'react';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
import { StyledListContainer, TableSelectors } from './ListMain.styles';
import { ToggleButton } from '../buttons/button.styles';

const DashboardList = () => {
    const [window, setWindow] = useState('flakiness');

    function updateTable(window) {
        setWindow(window);
        document.getElementById(
            'stability-table-status'
        ).textContent = `Content updated. Showing now ${window} table.`;
    }

    return (
        <StyledListContainer id="list-container">
            <p className="sr-show" role="status" id="stability-table-status">
                {' '}
            </p>
            <TableSelectors
                id="selector-buttons"
                role="radiogroup"
                aria-controls="stability-table"
            >
                <ToggleButton
                    role="radio"
                    aria-checked={window === 'flakiness'}
                    className={window === 'flakiness' ? 'selected' : ''}
                    onClick={() => updateTable('flakiness')}
                >
                    Stability
                </ToggleButton>
                <ToggleButton
                    role="radio"
                    aria-checked={window === 'failures'}
                    className={window === 'failures' ? 'selected' : ''}
                    onClick={() => updateTable('failures')}
                >
                    Failures
                </ToggleButton>
            </TableSelectors>
            <span id="stability-table">
                {window === 'flakiness' ? <FlakinessTable /> : <FailureTable />}
            </span>
        </StyledListContainer>
    );
};

export default DashboardList;
