import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { VegaLite } from 'react-vega';
import { useStateValue } from '../contexts/state';
import Loading from '../components/Loading';

const Dashboard = () => {
    const seriesId = 8;
    const numberOfBuilds = 10;

    const [{ historyDataState, loadingState }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/history?builds=${numberOfBuilds}`;

        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const response = await fetch(url, {});
                const json = await response.json();
                dispatch({
                    type: 'updateHistory',
                    historyData: json
                });
                dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch]);

    const { buildId } = useParams();

    const correctStatus = () => (buildId ? 'build' : 'series');

    const spec = {
        width: 400,
        height: 200,
        mark: 'bar',
        background: '#e9e8e8', // TODO: from variable
        actions: false,
        encoding: {
            x: {
                field: 'a',
                type: 'ordinal',
                sort: '-y',
                axis: { title: 'Suite name' }
            },
            y: {
                field: 'b',
                type: 'quantitative',
                axis: { title: 'Number of failing tests' }
            },
            color: {
                field: 'c',
                type: 'quantitative',
                sort: 'descending',
                axis: { title: 'Stability (average)' }
            },
            tooltip: { field: 'c', type: 'quantitative' }
        },
        data: { name: 'table' }
        // signals: [
        //     {
        //         name: 'tooltip',
        //         value: {},
        //         on: [
        //             { events: 'rect:mouseover', update: 'datum' },
        //             { events: 'rect:mouseout', update: {} }
        //         ]
        //     }
        // ]
        // Did not have time to figure this out yet
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
                    name: suite['name'],
                    failingTests: failingTests
                });
            }
        });

        const table = suites.map(suite => {
            const stability =
                suite.failingTests.reduce(
                    (acc, test) => acc + test.stability,
                    0
                ) / suite.failingTests.length;

            return {
                a: suite.name,
                b: suite.failingTests.length,
                c: stability
            };
        });

        return {
            table: table
        };
    };

    if (!historyDataState || loadingState) {
        return <Loading />;
    }

    const barData = generateBarData(historyDataState);

    return (
        <>
            <BreadcrumbNav status={correctStatus()} />
            <VegaLite spec={spec} data={barData} />
        </>
    );
};

export default Dashboard;
