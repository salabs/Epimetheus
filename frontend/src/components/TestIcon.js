import React from 'react';
import FA from 'react-fontawesome';
import theme from '../styles/theme';

export const pickIcon = test_status => {
    let result = '';
    // move to utils, copied in many places
    switch (test_status) {
        case 'PASS':
            result = (
                <TestStatusIcon
                    text="Pass"
                    type="check"
                    iconColor={theme.colors.pass}
                />
            );
            break;
        case 'FAIL':
            result = (
                <TestStatusIcon
                    text="Fail"
                    type="times"
                    iconColor={theme.colors.fail}
                />
            );
            break;
        case 'SKIPPED':
            result = (
                <TestStatusIcon
                    text="Skipped"
                    type="circle"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        case 'EMPTY':
            result = (
                <TestStatusIcon
                    text="Empty"
                    type="minus"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        case 'TIME':
            result = (
                <TestStatusIcon
                    text="Time"
                    type="clock-o"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        default:
            result = <span className="sr-show">Empty</span>;
    }

    return result;
};

const TestStatusIcon = ({ type, text, iconColor }) => {
    return (
        <>
            <FA name={type} style={{ color: iconColor }} />
            <span className="sr-show">{text}</span>
        </>
    );
};

export default TestStatusIcon;
