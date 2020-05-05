// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import theme from '../styles/theme';
import { css } from '@emotion/core';
import FA from 'react-fontawesome';
import { jsx } from '@emotion/core';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Notfound from '../components/NotFound';
import { Link } from 'react-router-dom';
import TestIcon from '../components/TestIcon';
const pickIcon = test_status => {
    let result = '';
    // move to utils, copied in many places
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
        case 'TIME':
            result = (
                <TestIcon
                    text="Time"
                    type="clock-o"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        default:
            result = '';
    }

    return result;
};
const Suite = () => {
    const { suiteId, buildId, seriesId, testId } = useParams();
    const [
        {
            selectedSuiteState,
            loadingState,
            branchesState,
            selectedBranchState
        },
        dispatch
    ] = useStateValue();
    const branch_id = seriesId || selectedBranchState;
    const container = css`
        .container {
            display: flex;
            //   flex-direction: column;
        }
        .fa {
            margin-right: 8px;
        }
        .suiteNav {
            list-style: none;
            padding: 0;
            background: #fff;
            align-content: center;
            border-right: 1px solid grey;
            flex-grow: 1;
        }
        .suiteNav div {
            display: flex;
            width: 100%;
            min-width: 120px;
        }
        .suiteNav span {
            float: right;
            margin-left: 12px;
        }
        .suiteNav a {
            width: 100%;
            padding: 10px;
            color: inherit;
            cursor: pointer;
            display: inline;
            text-decoration: none;
        }
        .suiteNav a:hover {
            background: #ddd;
        }
        .suiteMain {
            flex-grow: 2;
            padding: 10px;
            font-size: 1em;
        }
    `;
    useEffect(() => {
        const fetchHistoryData = async () => {
            if (branch_id && buildId) {
                const branch = branchesState.series?.find(
                    ({ id: serie_id }) => serie_id === parseInt(branch_id, 10)
                );
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch?.name,
                    id: seriesId,
                    team: branch?.team || ' '
                });
                dispatch({ type: 'setSelectedBuild', selectedBuild: buildId });
            }
        };
        const fetchSuiteData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(
                    `/data/series/${seriesId}/builds/${buildId}/suites/${suiteId}/?`,
                    {}
                );
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                dispatch({ type: 'setSelectedSuiteState', suite: json });
            } catch (error) {
                //console.log(error);
            }
        };
        if (branchesState) {
            fetchHistoryData();
            fetchSuiteData();
        }
    }, [dispatch, branch_id, suiteId, buildId, seriesId, branchesState]);

    return (
        <main id="suite" css={container}>
            {!selectedSuiteState || loadingState ? (
                <div
                    css={theme.loadingState}
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    aria-relevant="all"
                >
                    Loading
                </div>
            ) : selectedSuiteState.suite ? (
                <div>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    >
                        Content loaded.
                    </div>
                    <BreadcrumbNav status={'suite'} />
                    <div className="container">
                        <div className="suiteNav">
                            {selectedSuiteState.suite.tests.map((test, i) => {
                                return (
                                    <div key={i}>
                                        <Link
                                            to={`/series/${seriesId}/build/${buildId}/suite/${suiteId}/test/${test.id}`}
                                        >
                                            {pickIcon(test.status)}
                                            {test.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="suiteMain">
                            <div>ID: {selectedSuiteState.suite.id}</div>
                            <div>Name: {selectedSuiteState.suite.name}</div>
                            <div>
                                Fullname: {selectedSuiteState.suite.full_name}
                            </div>
                            <div>
                                Repository:{' '}
                                {selectedSuiteState.suite.repository}
                            </div>
                            <div>
                                Testrunid:{' '}
                                {selectedSuiteState.suite.test_run_id}
                            </div>
                            <div>
                                Starttime: {selectedSuiteState.suite.start_time}
                            </div>
                        </div>
                    </div>
                    <SelectedTest
                        test={selectedSuiteState.suite.tests.find(
                            i => i.id === parseInt(testId, 10)
                        )}
                    />
                </div>
            ) : (
                <Notfound />
            )}
        </main>
    );
};

const SelectedTest = ({ test }) => {
    const selectedTestStyles = css`
        .flex-grow {
            flex-grow: 1;
        }
        .flex-column {
            display: flex;
            flex-direction: column;
            padding: 5px;
        }
        .list-header {
            list-style: none;
            padding-left: 0px;
        }
        .list-title {
            color: grey;
        }
        background: #fff;
        margin-top: 5px;
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
        }
        thead {
            color: grey;
            font-size: 12px;
            text-align: left;
            border-bottom: 1px solid grey;
        }
        .table-item {
            padding: 0.25rem 0rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        tr {
            border-bottom: 1px solid #eee;
        }
    `;

    return test ? (
        <div>
            <div css={selectedTestStyles}>
                <div className="flex-grow flex-column">
                    <div className="list-title">
                        <FA name="desktop" />
                        Name and commit
                    </div>
                    <ul className="flex-column list-header">
                        <li>
                            <FA name="info" />
                            {test.name}
                        </li>
                        <li>
                            <FA name="terminal" />
                            {test.fingerprint}
                        </li>
                    </ul>
                </div>
                <div className="flex-grow flex-column">
                    <div className="list-title">
                        <FA name="tags" />
                        Tags
                    </div>
                    <ul className="flex-column list-header">
                        {test.tags.map((tag, i) => {
                            return <li key={i}>{tag}</li>;
                        })}
                    </ul>
                </div>
                <div className="flex-grow flex-column">
                    <div className="list-title">
                        <FA name="tachometer" />
                        Statuses
                    </div>
                    <ul className="flex-column list-header">
                        <li>Setup: {test.setup_status}</li>
                        <li>Execution: {test.execution_status}</li>
                        <li>Teardown: {test.teardown_status}</li>
                    </ul>
                </div>
            </div>
            <div css={selectedTestStyles}>
                <div className="flex-grow flex-column">
                    <div className="list-title">
                        <FA name="comment" />
                        Log messages
                    </div>
                    <table id="logMessages-table">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Log level</th>
                                <th style={{ width: '50%' }}>Message</th>
                                <th style={{ width: '30%' }}>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {test.log_messages !== null &&
                                test.log_messages.map(
                                    ({ log_level, message, timestamp }, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div className="table-item">
                                                        {log_level}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-item">
                                                        {message}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-item">
                                                        {pickIcon('TIME')}
                                                        {timestamp}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : null;
};

export default Suite;
