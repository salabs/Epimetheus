import React, { useEffect, useState } from 'react';
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

const FailuresTable = ({ failures }) => {
    return (
        <LastBuildTable>
            <thead>
                <tr>
                    <th>Suite</th>
                    <th>Test Case</th>
                </tr>
            </thead>
            <tbody>
                {failures.map(x => {
                    return (
                        <tr key={x.id}>
                            <td>{x.suite}</td>
                            <td>{x.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </LastBuildTable>
    );
};

export default FailuresTable;
