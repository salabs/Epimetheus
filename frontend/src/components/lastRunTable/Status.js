// eslint-disable-next-line
import React from 'react';
import { pickIcon } from '../TestIcon';
const Status = ({ build, selectedBuild }) => {
    const testStatus =
        Number(selectedBuild) === build.build_number
            ? build.test_status
            : 'EMPTY';

    const testStatusIcon = pickIcon(testStatus);
    return <td style={{ textAlign: 'center' }}>{testStatusIcon}</td>;
};

export default Status;
