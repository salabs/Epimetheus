import React from 'react';
import FA from 'react-fontawesome';
import { colorTypes } from './colorTypes';
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
            result = (
                <>
                    <Pass aria-hidden="true" />
                    <span className="sr-show">Status: Pass</span>
                </>
            );
            break;
        case 'FAIL':
            result = (
                <>
                    <Fail aria-hidden="true" name="Fail" />
                    <span className="sr-show">Status: Fail</span>
                </>
            );
            break;
        case 'SKIPPED':
            result = (
                <>
                    <Skipped aria-hidden="true" />
                    <span className="sr-show">Status: Skipped</span>
                </>
            );
            break;
        case 'EMPTY':
            result = (
                <>
                    <NotFound aria-hidden="true" />
                    <span className="sr-show">Status: Empty</span>
                </>
            );
            break;
        case 'TIME':
            result = (
                <TestStatusIcon
                    key={key}
                    text="Time"
                    type="clock-o"
                    iconColor={colorTypes['tonic grey']}
                />
            );
            break;
        default:
            result = <span className="sr-show">Status: Empty</span>;
    }

    return result;
};

export default TestStatusIcon;
