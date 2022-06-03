import React, { useContext } from 'react';
import { Table } from '../table/Table';
import Body from './Body';
import { StateContext } from '../../contexts/state';

const TestComparisonTable = () => {
    const { state } = useContext(StateContext);
    const {
        parentData: { buildData },
    } = state;

    return (
        buildData && (
            <Table tableId="comparison-table">
                <thead>
                    <tr>
                        <th>Full Test Name</th>
                        <th className="centerTableCellContent">
                            {buildData.name} Status
                        </th>
                        <th className="centerTableCellContent">
                            {buildData.name2} Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <Body />
                </tbody>
            </Table>
        )
    );
};

export default TestComparisonTable;
