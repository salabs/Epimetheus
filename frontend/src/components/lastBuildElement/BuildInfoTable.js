import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../../contexts/state';

const LastBuildTable = styled.table`
    width: 100%;
    th {
        margin: 20px;
        text-align: left;
        vertical-align: middle;
    }

    td {
        margin: 20px;
        padding-right: 20px;
        text-align: left;
        vertical-align: middle;
    }
`;

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
                    <td>Last Build ID</td>
                    <td>{seriesData.last_build_id}</td>
                </tr>
                <tr>
                    <td>Start Time</td>
                    <td>{seriesData.last_started}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{seriesData.last_status}</td>
                </tr>
            </tbody>
        </LastBuildTable>
    );
};

export default BuildInfoTable;
