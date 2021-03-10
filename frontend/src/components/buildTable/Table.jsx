// eslint-disable-next-line
import React from 'react';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { HeaderRow } from './Table.styles';
import { OverflowWrapper, TableWrapper } from '../historyTable/Table.styles';
import { SpreadSheetTable } from '../../styles/baseComponents';

const Table = ({ id }) => {
    const [t] = useTranslation(['history']);

    return (
        <TableWrapper>
            <OverflowWrapper>
                <SpreadSheetTable id="last-run-table">
                    <thead>
                        <HeaderRow>
                            <th>{t('build.table.suite')}</th>
                            <th className="centerTableCellContent">
                                {t('build.table.status')}
                            </th>
                            <th>{t('build.table.test')}</th>
                            <th>{t('build.table.error')}</th>
                            <th className="test-time-row">
                                {t('build.table.time')}
                            </th>
                            <th className="centerTableCellContent">
                                {t('build.table.flakiness')}
                            </th>
                        </HeaderRow>
                    </thead>
                    <tbody>
                        <Body id={id} />
                    </tbody>
                </SpreadSheetTable>
            </OverflowWrapper>
        </TableWrapper>
    );
};

export default Table;
