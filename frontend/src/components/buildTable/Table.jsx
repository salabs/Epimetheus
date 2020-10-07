// eslint-disable-next-line
import React from 'react';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { StyledTable, HeaderRow, Container } from './Table.styles';

const Table = ({ id }) => {
    const [t] = useTranslation(['history']);

    return (
        <Container>
            <StyledTable id="last-run-table">
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
            </StyledTable>
        </Container>
    );
};

export default Table;
