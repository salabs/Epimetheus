import React, { useState } from 'react';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
import { useTranslation } from 'react-i18next';
import { TableSelectors } from './ListMain.styles';
import { ToggleButton } from '../../styles/button.styles';

const DashboardList = () => {
    const [t] = useTranslation(['overview']);
    const [window, setWindow] = useState('stability');

    function updateTable(window) {
        setWindow(window);
        document.getElementById(
            'stability-table-status'
        ).textContent = `${t('series.status_update', { window })}`;
    }

    return (
        <div id="list-container">
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
                    aria-checked={window === 'stability'}
                    className={window === 'stability' ? 'selected' : ''}
                    onClick={() => updateTable('stability')}
                >
                    {t('series.stability_table.stability')}
                </ToggleButton>
                <ToggleButton
                    role="radio"
                    aria-checked={window === 'failures'}
                    className={window === 'failures' ? 'selected' : ''}
                    onClick={() => updateTable('failures')}
                >
                    {t('series.stability_table.failures')}
                </ToggleButton>
            </TableSelectors>
            <div id="stability-table">
                {window === 'stability' ? <FlakinessTable /> : <FailureTable />}
            </div>
        </div>
    );
};

export default DashboardList;
