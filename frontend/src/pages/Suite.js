/** @jsx jsx */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import theme from '../theme';
import { css } from '@emotion/core';

import { jsx } from '@emotion/core';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Notfound from '../components/NotFound';

const Suite = () => {
    const { suiteId, buildId, seriesId } = useParams();
    const [
        {
            selectedSuiteState,
            loadingState,
            branchesState,
            selectedBranchState
        },
        dispatch
    ] = useStateValue();
    const [selectedTestId, setSelectedTestId] = useState();
    const branch_id = seriesId || selectedBranchState;
    const container = css`
        .container {
            display: flex;
            //   flex-direction: column;
        }
        .suiteNav {
            flex-grow: 1;
            background: #fff;
            align-content: center;
            border-right: 1px solid grey;
        }
        .suiteNav div {
            padding: 10px;
            cursor: pointer;
        }
        .suiteNav div:hover {
            background: #ddd;
        }
        .suiteMain {
            flex-grow: 2;
            padding: 10px;
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
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setSelectedTestId(test.id);
                                        }}
                                    >
                                        {test.name}
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
                            i => i.id === selectedTestId
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
    return <div>{JSON.stringify(test, null, 1)}</div>;
};

export default Suite;
