import React from 'react';
import FA from 'react-fontawesome';
import theme from '../styles/theme';
import styled from 'styled-components';
import { ReactComponent as Pass } from '../images/success.svg';
import { ReactComponent as Fail } from '../images/fail.svg';
import { ReactComponent as Skipped } from '../images/skip.svg';
import { ReactComponent as NotFound } from '../images/not-found.svg';

const Fanner = styled(FA)`
    ${props => props.type === 'clock-o' && 'margin-right: 8px'}
`;

const TestStatusIcon = ({ type, text, iconColor }) => {
    return (
        <>
            <Fanner name={type} type={type} style={{ color: iconColor }} />
            <span className="sr-show">{text}</span>
        </>
    );
};

export const pickIcon = (test_status, key) => {
    let result = '';
    // move to utils, copied in many places
    switch (test_status) {
        case 'PASS':
            result = <Pass name="Pass" />;
            break;
        case 'FAIL':
            result = <Fail name="Fail" />;
            break;
        case 'SKIPPED':
            result = <Skipped text="Skipped" />;
            break;
        case 'EMPTY':
            result = <NotFound />;
            break;
        case 'TIME':
            result = (
                <TestStatusIcon
                    key={key}
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

export default TestStatusIcon;
