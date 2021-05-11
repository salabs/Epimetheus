import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { Table } from '../table/Table';

const SeriesTestResultTable = ({ seriesHistory }) => {
    const { max_build_num, history } = seriesHistory;

    if (max_build_num > 0) {
        return (
            <Table robot_id="history-table" tableId="history-table">
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

SeriesTestResultTable.propTypes = {
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
};

export default SeriesTestResultTable;
