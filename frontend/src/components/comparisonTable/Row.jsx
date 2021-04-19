import React from 'react';
import Status from './Status';

const Row = ({ full_name, status1, status2 }) => {
    return (
        <tr>
            <td>{full_name}</td>
            <Status status={status1} />
            <Status status={status2} />
        </tr>
    );
};

export default Row;
