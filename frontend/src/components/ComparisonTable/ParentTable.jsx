import React from 'react';
import * as R from 'ramda';
import { compareTypes } from '../../utils/parentDataTypes';
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
                <div>
                    <table>
                        <thead>
                            <tr>{headerRow()}</tr>
                        </thead>
                        <tbody>
                            <tr>{bodyRow()}</tr>
                        </tbody>
                        <tbody>
                            <tr>{bodyRow2()}</tr>
                        </tbody>
                    </table>
                </div>
            )}
        </React.Fragment>
    );
};

export default ParentTable;
