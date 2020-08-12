import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../../contexts/state';

const LastBuildTable = styled.table`
    width: 100%;
    th {
        margin: 30px;
        text-align: left;
        vertical-align: middle;
        border-bottom: 1px solid #ddd;
    }

    td {
        margin: 20px;
        text-align: left;
        vertical-align: middle;
    }
`;

const FailuresTable = () => {
    const [
        {
            parentData: { seriesData, buildData },
        },
    ] = useStateValue();

    return (
        <LastBuildTable>
            <thead>
                <tr>
                    <th>Suite</th>
                    <th>Test Case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>SuiteX</td>
                    <td>testi</td>
                </tr>
                <tr>
                    <td>SuiteY</td>
                    <td>testi2</td>
                </tr>
            </tbody>
        </LastBuildTable>
    );
};

export default FailuresTable;
