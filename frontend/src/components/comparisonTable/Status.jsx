import React from 'react';
import { pickIcon } from '../../utils/TestIcon';

const Status = ({ status }) => {
    const testStatusIcon = pickIcon(status);
    return <td style={{ textAlign: 'center' }}>{testStatusIcon}</td>;
};

export default Status;
