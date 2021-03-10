// eslint-disable-next-line
import React from 'react';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Table } from '../table/Table';
import { WideTh } from '../table/Table.styles';

const BuildTable = ({ id }) => {
    const [t] = useTranslation(['history']);

    return (
        <Table table-id="last-run-table">
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
            <Body id={id} />
        </Table>
    );
};

export default BuildTable;
