import React from 'react';
import styled from 'styled-components';

const LastBuildTable = styled.table`
    width: 100%;
    th {
        margin: 20px;
        text-align: left;
        vertical-align: middle;
        border-bottom: 1px solid var(--tonic-grey);
    }

    td {
        padding-right: 5px;
        margin: 20px;
        text-align: left;
        vertical-align: middle;
    }
    thead th:nth-of-type(1) {
        width: 40%;
    }

    thead th:nth-of-type(2) {
        width: 50%;
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
