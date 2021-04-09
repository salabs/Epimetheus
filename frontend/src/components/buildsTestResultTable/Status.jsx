// eslint-disable-next-line
import React from 'react';
import { pickIcon } from '../../utils/TestIcon';

const Status = ({ build, selectedBuild }) => {
    const testStatus =
        Number(selectedBuild) === build.build_number
            ? build.test_status
            : 'EMPTY';

    const testStatusIcon = pickIcon(testStatus);
    return <td>{testStatusIcon}</td>;
};

export default Status;
