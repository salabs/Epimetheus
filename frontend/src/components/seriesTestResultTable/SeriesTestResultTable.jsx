import React from 'react';
import { Heading } from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { useStateValue } from '../../contexts/state';
import { Table } from '../table/Table';

const SeriesTestResultTable = () => {
    const [
        {
            historyDataState: { max_build_num },
        },
    ] = useStateValue();

    if (max_build_num > 0) {
        return (
            <Table tableId="history-table">
                <Heading />
                <Body id="history-table-body" />
            </Table>
        );
    } else {
        return <NotFound />;
    }
};

export default SeriesTestResultTable;
