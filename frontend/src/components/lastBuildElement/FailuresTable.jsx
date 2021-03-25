import React from 'react';
import { SimpleTable } from '../table/Table.styles';

const FailuresTable = ({ failures }) => {
    return (
        <SimpleTable>
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
        </SimpleTable>
    );
};

export default FailuresTable;
