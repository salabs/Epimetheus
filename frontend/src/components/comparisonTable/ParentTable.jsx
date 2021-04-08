import React from 'react';
import * as R from 'ramda';
import { compareTypes } from '../../utils/parentDataTypes';
import { Table } from '../table/Table';
const ParentTable = props => {
    const { data, types } = props;

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
                <Table simpleTable={true} id="parent-build-comparison-table">
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

export default ParentTable;
