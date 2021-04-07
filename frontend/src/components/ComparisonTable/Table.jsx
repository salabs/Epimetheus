import React from 'react';
import { useStateValue } from '../../contexts/state';

import Body from './Body';

const Table = () => {
    const [
        {
            parentData: { buildData },
        },
    ] = useStateValue();

    return (
        buildData && (
            <table id="comparison-table">
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
            </table>
        )
    );
};

export default Table;
