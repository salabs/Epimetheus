// eslint-disable-next-line
import React from 'react';
import theme from '../../styles/theme';
import TestIcon from '../TestIcon';

const pickIcon = test_status => {
    let result = '';

    switch (test_status) {
        case 'PASS':
            result = (
                <TestIcon
                    text="Pass"
                    type="check"
                    iconColor={theme.colors.pass}
                />
            );
            break;
        case 'FAIL':
            result = (
                <TestIcon
                    text="Fail"
                    type="times"
                    iconColor={theme.colors.fail}
                />
            );
            break;
        case 'SKIPPED':
            result = (
                <TestIcon
                    text="Skipped"
                    type="circle"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        case 'EMPTY':
            result = (
                <TestIcon
                    text="Empty"
                    type="minus"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        default:
            result = '';
    }

    return result;
};

const Status = ({ build, selectedBuild }) => {
    const testStatus =
        Number(selectedBuild) === build.build_number
            ? build.test_status
            : 'EMPTY';

    const testStatusIcon = pickIcon(testStatus);
    return <td style={{ textAlign: 'center' }}>{testStatusIcon}</td>;
};

export default Status;
