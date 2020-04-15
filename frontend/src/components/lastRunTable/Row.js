// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SuiteName from '../SuiteName';
import Flakiness from './Flakiness';
import Status from './Status';
import Error from './Error';
import TestCase from './TestCase';

const Row = ({ test_cases, suite, id, suiteId }) => {
    const tableRowStyles = css`
        cursor: pointer;
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

    const tableRow = test_cases.map(({ builds }, index) => {
        let filteredBuilds = null;
        if (id) {
            filteredBuilds = builds.filter(
                ({ build_number }) => build_number === Number(id)
            );
        }

        const build =
            filteredBuilds !== null && filteredBuilds.length > 0
                ? filteredBuilds[0]
                : builds[0];

        const testRunTime = build ? build.test_run_time : 'ei ole';

        return (
            <tr css={tableRowStyles} key={index}>
                {index === 0 && (
                    <SuiteName
                        tableCellHeight={test_cases.length}
                        suiteName={suite}
                        suiteId={suiteId}
                    />
                )}
                <Status build={build} selectedBuild={id} />
                <TestCase testCases={test_cases} index={index} />

                <Error build={build} />
                <td className="test-time-row">
                    {(testRunTime / 1000).toFixed(3)}s
                </td>
                <Flakiness builds={builds} id={id} />
            </tr>
        );
    });

    return tableRow;
};

export default Row;
