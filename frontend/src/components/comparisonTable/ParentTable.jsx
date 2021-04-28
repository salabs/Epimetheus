import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { compareTypes } from '../../utils/parentDataTypes';
import { Table } from '../table/Table';

const ParentTable = ({ data, types }) => {
    const headerRow = () => {
        return types.map(name => {
            return <th key={name}>{name}</th>;
        });
    };

    const bodyRow = () => {
        const bodyValues = R.props(types, data);

        return bodyValues.map((value, index) => {
            return <td key={index}>{value}</td>;
        });
    };

    const bodyRow2 = () => {
        const bodyValues = R.props(compareTypes, data);

        return bodyValues.map((value, index) => {
            return <td key={index}>{value}</td>;
        });
    };
    return (
        <React.Fragment>
            {data && (
                <Table
                    simpleTable={true}
                    tableId="parent-build-comparison-table"
                >
                    <thead>
                        <tr>{headerRow()}</tr>
                    </thead>
                    <tbody>
                        <tr>{bodyRow()}</tr>
                        <tr>{bodyRow2()}</tr>
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    );
};

ParentTable.propTypes = {
    data: PropTypes.shape({
        archiving_time: PropTypes.string,
        build_id: PropTypes.string,
        build_id2: PropTypes.string,
        build_number: PropTypes.number,
        build_number2: PropTypes.number,
        generation_time: PropTypes.string,
        name: PropTypes.string,
        name2: PropTypes.string,
        start_time: PropTypes.string,
        start_time2: PropTypes.string,
        status: PropTypes.string,
        team: PropTypes.string,
        team2: PropTypes.string,
        test_runs: PropTypes.array,
    }), // is actually required, but gives an error on the first time due to 'data' being undefined
    types: PropTypes.array.isRequired,
};

export default ParentTable;
