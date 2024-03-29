import React from 'react';
import PropTypes from 'prop-types';
import { historyPropType } from '../../../../utils/PropTypes';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Table } from '../../../table/Table';
import { WideTh } from '../../../table/Table.styles';

const BuildsTestResultTable = ({ id, buildHistory }) => {
    const [t] = useTranslation(['history']);

    return (
        <Table robot_id="last-run-table" tableId="last-run-table">
            <thead>
                <tr>
                    <WideTh>{t('build.table.suite')}</WideTh>
                    <th>{t('build.table.status')}</th>
                    <th>{t('build.table.test')}</th>
                    <WideTh>{t('build.table.error')}</WideTh>
                    <th>{t('build.table.time')}</th>
                    <th>Average time</th>
                    <th>{t('build.table.flakiness')}</th>
                </tr>
            </thead>
            <Body id={id} history={buildHistory} />
        </Table>
    );
};

BuildsTestResultTable.propTypes = {
    id: PropTypes.string.isRequired,
    buildHistory: historyPropType.isRequired,
};

export default BuildsTestResultTable;
