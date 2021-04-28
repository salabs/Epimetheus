import React from 'react';
import PropTypes from 'prop-types';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Table } from '../table/Table';
import { WideTh } from '../table/Table.styles';

const BuildsTestResultTable = ({ id, buildHistory }) => {
    const [t] = useTranslation(['history']);
    const { history } = buildHistory;

    return (
        <Table tableId="last-run-table">
            <thead>
                <tr>
                    <WideTh>{t('build.table.suite')}</WideTh>
                    <th>{t('build.table.status')}</th>
                    <th>{t('build.table.test')}</th>
                    <WideTh>{t('build.table.error')}</WideTh>
                    <th>{t('build.table.time')}</th>
                    <th>{t('build.table.flakiness')}</th>
                </tr>
            </thead>
            <Body id={id} history={history} />
        </Table>
    );
};

BuildsTestResultTable.propTypes = {
    id: PropTypes.string.isRequired,
    buildHistory: PropTypes.shape({
        max_build_num: PropTypes.number,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                full_name: PropTypes.string,
                id: PropTypes.number,
                name: PropTypes.string,
                repository: PropTypes.string,
                suite: PropTypes.string,
                suite_full_name: PropTypes.string,
                suide_id: PropTypes.number,
                test_cases: PropTypes.array,
            }).isRequired
        ),
    }),
};

export default BuildsTestResultTable;
