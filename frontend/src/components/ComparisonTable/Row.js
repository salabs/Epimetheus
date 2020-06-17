// eslint-disable-next-line
import React, { Fragment } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Status from './Status';
import { dashify } from '../../utils/helpers';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Row = ({ full_name, status1, status2 }) => {
    const tableRowStyles = css`
        .test-time-row {
            text-align: right;
        }

        .flakiness-row {
            font-size: 14px;
            text-align: center;
            span {
                width: 13px;
            }
            span + span {
                margin-left: 2px;
            }
        }
    `;
    
    return (
            <tr css={tableRowStyles} >
                <td>{full_name}</td>
                <Status status={status1} />
                <Status status={status2} />
            </tr>
        );
    
};

export default Row;

const TestCase = ({ testCases, index, suiteId, testId }) => {
    const testCase = testCases[index].test_case;
    const pathname = useLocation().pathname;
    const correctUrl = pathname.substring(0, pathname.lastIndexOf('/'));
    return (
        <td>
            <Link to={`${correctUrl}/suite/${suiteId}/test/${testId}/history`}>
                {testCase}
            </Link>
        </td>
    );
};

// Show suite name separated on different lines with dots showing depth level
const LinksSuiteName = ({ tableCellHeight, suiteName, suiteId }) => {
    const pathname = useLocation().pathname;
    const correctUrl = pathname.substring(0, pathname.lastIndexOf('/'));
    let tempSuiteName = suiteName.split('.');
    let splitSuiteName = [];
    for (var index = 0; index < tempSuiteName.length; index++) {
        let el = tempSuiteName[index];
        splitSuiteName.push(
            <Fragment key={index}>
                .{el}
                <br />
            </Fragment>
        );
    }

    return (
        <td rowSpan={tableCellHeight} data-ta={`suite-${dashify(suiteName)}`}>
            <Link to={`${correctUrl}/suite/${suiteId}/history`}>
                <span className="sr-show">Build </span>
                {splitSuiteName}
            </Link>
        </td>
    );
};
