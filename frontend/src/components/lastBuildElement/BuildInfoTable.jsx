import React from 'react';
import { useStateValue } from '../../contexts/state';
import { SimpleTable, WideTh } from '../table/Table.styles';

const BuildInfoTable = () => {
    const [
        {
            parentData: { seriesData },
        },
    ] = useStateValue();
    return (
        <SimpleTable>
            <tbody>
                <tr>
                    <WideTh>Last Build ID</WideTh>
                    <td>{seriesData.last_build_id}</td>
                </tr>
                <tr>
                    <WideTh>Start Time</WideTh>
                    <td>{seriesData.last_started}</td>
                </tr>
                <tr>
                    <WideTh>Status</WideTh>
                    <td>{seriesData.last_status}</td>
                </tr>
            </tbody>
        </SimpleTable>
    );
};

export default BuildInfoTable;
