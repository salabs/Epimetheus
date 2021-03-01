import React from 'react';
import { useStateValue } from '../../contexts/state';
import { LastBuildTable } from './BuildInfoTable.styles';

const BuildInfoTable = () => {
    const [
        {
            parentData: { seriesData },
        },
    ] = useStateValue();
    return (
        <LastBuildTable>
            <tbody>
                <tr>
                    <th>Last Build ID</th>
                    <td>{seriesData.last_build_id}</td>
                </tr>
                <tr>
                    <th>Start Time</th>
                    <td>{seriesData.last_started}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{seriesData.last_status}</td>
                </tr>
            </tbody>
        </LastBuildTable>
    );
};

export default BuildInfoTable;
