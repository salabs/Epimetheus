// eslint-disable-next-line
import React from 'react';
import { pickIcon } from '../TestIcon';
const Status = ({ status }) => {
    const testStatusIcon = pickIcon(status);
    return <td style={{ textAlign: 'center' }}>{testStatusIcon}</td>;
};

export default Status;
