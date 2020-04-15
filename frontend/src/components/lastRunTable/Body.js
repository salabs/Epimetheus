// eslint-disable-next-line
import React from 'react';
import Row from './Row';
import { useStateValue } from '../../contexts/state';
import { useParams } from 'react-router';

const Body = ({ id }) => {
    const [
        {
            historyDataState: { history },
            lastRunFilterPass,
            lastRunFilterFail
        }
    ] = useStateValue();
    let { buildId } = useParams();
    const buildNum = buildId;

    // Do we want last-run page filters to work on suite-level (false)
    // or test-level (true)?
    const SUITE_FILTER_NESTED = true;

    // Get result for this specific run
    const filteredSuitesByBuildNumber = history.filter(({ test_cases }) => {
        return test_cases.some(({ builds }) => {
            return builds.some(
                ({ build_number }) => build_number === Number(buildNum)
            );
        });
    });
    // Filter suites based on filter criteria
    // https://stackoverflow.com/questions/38375646/filtering-array-of-objects-with-arrays-based-on-nested-value
    let filteredRowData = []; // clear results
    if (SUITE_FILTER_NESTED) {
        filteredRowData = filteredSuitesByBuildNumber
            .filter(element =>
                element.test_cases.some(
                    test_cases =>
                        test_cases.builds[0].test_status !==
                        lastRunFilterPass.filterType
                )
            )
            .map(element => {
                return Object.assign({}, element, {
                    test_cases: element.test_cases.filter(
                        test_cases =>
                            test_cases.builds[0].test_status !==
                            lastRunFilterPass.filterType
                    )
                });
            });
    } else {
        filteredRowData = filteredSuitesByBuildNumber.filter(
            ({ test_cases }) => {
                return test_cases.some(({ builds }) => {
                    return builds
                        .slice(0, 1)
                        .some(
                            ({ test_status }) =>
                                test_status !== lastRunFilterPass.filterType
                        );
                });
            }
        );
    }

    if (SUITE_FILTER_NESTED) {
        filteredRowData = filteredRowData
            .filter(element =>
                element.test_cases.some(
                    test_cases =>
                        test_cases.builds[0].test_status !==
                        lastRunFilterFail.filterType
                )
            )
            .map(element => {
                return Object.assign({}, element, {
                    test_cases: element.test_cases.filter(
                        test_cases =>
                            test_cases.builds[0].test_status !==
                            lastRunFilterFail.filterType
                    )
                });
            });
    } else {
        filteredRowData = filteredRowData.filter(({ test_cases }) => {
            return test_cases.some(({ builds }) => {
                return builds
                    .slice(0, 1)
                    .some(
                        ({ test_status }) =>
                            test_status !== lastRunFilterFail.filterType
                    );
            });
        });
    }

    return filteredRowData.map(
        ({ test_cases, suite_full_name, suite_id }, i) => {
            return (
                <Row
                    key={i}
                    test_cases={test_cases}
                    suite={suite_full_name}
                    id={buildNum}
                    suiteId={suite_id}
                />
            );
        }
    );
};

export default Body;
