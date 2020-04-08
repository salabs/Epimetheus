/** @jsx jsx */
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import theme from '../theme';
import { css } from '@emotion/core';

import { jsx } from '@emotion/core';

const Suite = () => {
    const { suiteId, buildId, seriesId } = useParams();
    const [{ selectedSuiteState, loadingState }, dispatch] = useStateValue();

    const container = css`
        .container {
            display: flex;
            //   flex-direction: column;
        }
        .suiteNav {
            flex-grow: 1;
            background: #ddd;
            align-content: center;
            border-right: 1px solid grey;
        }
        .suiteNav div {
            padding: 10px;
            cursor: pointer;
        }
        .suiteMain {
            flex-grow: 2;
            padding: 10px;
        }
    `;

    /* 
name
full_name
repository
test_run_id
start_time
*/
    useEffect(() => {
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
                console.log(json);
            } catch (error) {
                //console.log(error);
            }
        };
        fetchSuiteData();
    }, [suiteId, buildId, seriesId]);

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
            ) : (
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
                    <div>Lorem ipsum ya see dis</div>
                    <div className="container">
                        <div className="suiteNav">
                            {selectedSuiteState.suite.tests.map((test, i) => {
                                return <div key={i}>{test.name}</div>;
                            })}
                        </div>
                        <div className="suiteMain">
                            {selectedSuiteState.suite.tests.map((test, i) => {
                                return <div key={i}>{test.status}</div>;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Suite;
