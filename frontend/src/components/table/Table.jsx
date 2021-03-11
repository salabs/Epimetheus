import React from 'react';
import {
    OverflowWrapper,
    SimpleTable,
    SpreadSheetTable,
    TableWrapper,
} from './Table.styles';
import ScrollTableButton from './ScrollTableButton';

export const TableSpreadSheet = props => {
    const tableId = props['table-id'];

    return (
        <TableWrapper>
            <ScrollTableButton table-id={tableId} />
            <OverflowWrapper id={tableId}>
                <SpreadSheetTable>{props.children}</SpreadSheetTable>
            </OverflowWrapper>
        </TableWrapper>
    );
};

export const TableSimple = props => {
    const tableId = props['table-id'];

    return (
        <TableWrapper>
            <ScrollTableButton table-id={tableId} />
            <OverflowWrapper id={tableId}>
                <SimpleTable>{props.children}</SimpleTable>
            </OverflowWrapper>
        </TableWrapper>
    );
};
