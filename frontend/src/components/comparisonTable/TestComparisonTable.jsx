import React from 'react';
import { useStateValue } from '../../contexts/state';
import { Table } from '../table/Table';
import Body from './Body';

const TestComparisonTable = () => {
    const [
        {
            parentData: { buildData },
        },
    ] = useStateValue();

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
