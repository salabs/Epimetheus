import React from 'react';
import { Heading } from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { Table } from '../table/Table';

const SeriesTestResultTable = ({ seriesHistory }) => {
    const { max_build_num, history } = seriesHistory;

    if (max_build_num > 0) {
        return (
            <Table tableId="history-table">
                <Heading max_build_num={max_build_num} />
                <Body
                    id="history-table-body"
                    history={history}
                    max_build_num={max_build_num}
                />
            </Table>
        );
    } else {
        return <NotFound />;
    }
};

export default SeriesTestResultTable;
