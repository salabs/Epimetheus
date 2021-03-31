import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { VegaLite } from 'react-vega';
import { useStateValue } from '../../contexts/state';
import Loading from '../Loading';
import { colorTypes } from '../../utils/colorTypes';
import { css } from 'styled-components';
import { pickIcon } from '../../utils/TestIcon';
import { Table } from '../table/Table';

const canvasStyles = css`
    padding: 20px 0;
    summary {
        display: none;
    }
`;

const SuiteInstability = () => {
    const [selectedSuite, setSelectedSuite] = useState(null);
    const [
        { amountOfBuilds, historyDataState, loadingState },
        dispatch,
    ] = useStateValue();

    const { seriesId } = useParams();

    const numberOfBuilds = amountOfBuilds || 30; // FIXME: magic

    useEffect(() => {
        const url = `/data/series/${seriesId}/history?builds=${numberOfBuilds}`;

        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const response = await fetch(url, {});
                const json = await response.json();
                dispatch({
                    type: 'updateHistory',
                    historyData: json,
                });
                dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();

        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'flushHistory' });
        };
    }, [dispatch, numberOfBuilds, seriesId]);

    const barSpec = {
        width: 400,
        height: 200,
        config: {
            axis: {
                labelFont: 'Hack',
                titleFont: 'Hack',
            },
            legend: {
                labelFont: 'Hack',
                titleFont: 'Hack',
            },
            header: {
                labelFont: 'Hack',
                titleFont: 'Hack',
            },
            mark: {
                font: 'Hack',
            },
            title: {
                font: 'Hack',
                subtitleFont: 'Hack',
            },
        },
        mark: {
            type: 'bar',
            stroke: colorTypes['gradient black'],
        },
        background: colorTypes['nero white'],
        actions: 'FALSE',
        selection: {
            highlight: { type: 'single', empty: 'none', on: 'mouseover' },
            select: {
                type: 'single',
                fields: ['id'],
                encodings: ['x'],
            },
        },
        encoding: {
            x: {
                field: 'name',
                type: 'ordinal',
                sort: '-y',
                axis: { title: 'Suite name' },
            },
            y: {
                field: 'numberOfFailingTests',
                type: 'quantitative',
                axis: { title: 'Number of failing tests' },
            },
            tooltip: [
                {
                    field: 'stability',
                    type: 'quantitative',
                    title: 'Stability',
                },
            ],
            fillOpacity: {
                condition: {
                    selection: 'select',
                    value: 1,
                },
                value: 0.3,
            },
            strokeWidth: {
                condition: [
                    {
                        selection: 'highlight',
                        value: 1,
                    },
                    {
                        test: {
                            and: [
                                {
                                    selection: 'select',
                                },
                                'length(data("select_store"))',
                            ],
                        },
                    },
                ],
                value: 0,
            },
            color: {
                field: 'stability',
                type: 'quantitative',
                sort: 'descending',
                axis: { title: 'Stability (average)' },
                legend: {
                    direction: 'horizontal',
                },
            },
        },
        data: { name: 'failingSuites' },
    };

    const calculateTestStability = test => {
        var states = 1;
        var passes = 0;
        let previousStatus;

        test['builds'].forEach(testRun => {
            if (!previousStatus) {
                previousStatus = testRun.status;
            } else if (previousStatus !== testRun.status) {
                states += 1;
            }

            if (testRun.status === 'PASS') {
                passes++;
            }
        });

        return passes / states / test['builds'].length;
    };

    const generateBarData = historyDataState => {
        const suites = [];

        historyDataState['history'].forEach(suite => {
            const failingTests = [];

            suite['test_cases'].forEach(testCase => {
                const isFailingTest = testCase['builds'].some(testRun => {
                    return testRun['status'] === 'FAIL';
                });
                if (isFailingTest) {
                    const stability = calculateTestStability(testCase);
                    failingTests.push({ name: testCase.name, stability });
                }
            });

            if (failingTests.length) {
                suites.push({
                    id: suite['suite_id'],
                    name: suite['name'],
                    failingTests,
                });
            }
        });

        const failingSuites = suites.map(suite => {
            const stability =
                suite.failingTests.reduce(
                    (acc, test) => acc + test.stability,
                    0
                ) / suite.failingTests.length;

            return {
                name: suite.name,
                numberOfFailingTests: suite.failingTests.length,
                stability,
                id: suite.id,
            };
        });

        return { failingSuites };
    };

    if (!historyDataState || loadingState) {
        return <Loading />;
    }

    const selectSuite = id => {
        const suite = historyDataState['history'].find(
            suite => suite['suite_id'] === id
        );

        if (suite) {
            setSelectedSuite(suite);
        }
    };

    const deselectSuite = () => setSelectedSuite(null);

    const handleBarChartClick = (_name, values) => {
        if (values.id) {
            selectSuite(values.id[0]);
        } else {
            deselectSuite();
        }
    };

    const signalListeners = { select: handleBarChartClick };

    const barData = generateBarData(historyDataState);

    const buildsInTotal = Math.min(
        historyDataState['max_build_num'],
        numberOfBuilds
    );

    const generateStatusRow = testCase => {
        let statuses = [];

        for (let i = 0; i < buildsInTotal; i++) {
            const testStatus = testCase['builds'].find(build => {
                return build['build_number'] === i + 1;
            });

            if (testStatus) {
                if (testStatus['status'] === 'PASS') {
                    statuses.push(pickIcon('PASS', i));
                } else if (testStatus['status'] === 'FAIL') {
                    statuses.push(pickIcon('FAIL', i));
                }
            } else {
                // Impute
                statuses.push(pickIcon('SKIPPED', i));
            }
        }

        return statuses;
    };

    return (
        <React.Fragment>
            <VegaLite
                spec={barSpec}
                data={barData}
                actions={false}
                signalListeners={signalListeners}
                css={canvasStyles}
            />
            {selectedSuite && (
                <Table>
                    <thead>
                        <tr>
                            <th>{selectedSuite.name}</th>
                            <th>Test history</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSuite['test_cases'].map(testCase => (
                            <tr key={testCase['test_id']}>
                                <td>{testCase.name}</td>
                                <td>{generateStatusRow(testCase)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    );
};

export default SuiteInstability;
