import React, { useContext } from 'react';
import Row from './Row';
import { useParams } from 'react-router';
import { StateContext } from '../../contexts/state';

const Body = () => {
    const { state } = useContext(StateContext);
    const {
        comparedDataState,
        compareFilterMatch,
        compareFilterMismatch,
    } = state;

    let { buildId, buildId2 } = useParams();

    // Do we want last-run page filters to work on suite-level (false)
    // or test-level (true)?
    // const SUITE_FILTER_NESTED = true;

    // Get result for this specific run, as well as parse the full name of a test case and the result of the test case.
    function getRunResults(comparedDataState, buildId, status) {
        return comparedDataState
            .filter(({ test_cases }) => {
                return test_cases.some(({ builds }) => {
                    return builds.some(
                        ({ build_number }) => build_number === Number(buildId)
                    );
                });
            })
            .flatMap(x => x.test_cases)
            .map(test => {
                if (status === 1) {
                    return {
                        full_name: test.full_name,
                        status1: test.builds[0].test_status,
                        status2: '',
                    };
                } else if (status === 2) {
                    return {
                        full_name: test.full_name,
                        status1: '',
                        status2: test.builds[0].test_status,
                    };
                }
                return null;
            });
    }

    const firstBuildByBuildNumber = getRunResults(
        comparedDataState[0],
        buildId,
        1
    );
    const secondBuildByBuildNumber = getRunResults(
        comparedDataState[1],
        buildId2,
        2
    );

    //We create an array of matching test cases
    const matching_array = [];
    secondBuildByBuildNumber.forEach(test_case2 => {
        firstBuildByBuildNumber.forEach(test_case1 => {
            if (test_case1.full_name === test_case2.full_name) {
                matching_array.push({
                    full_name: test_case1.full_name,
                    status1: test_case1.status1,
                    status2: test_case2.status2,
                });
            }
        });
    });

    function getNthMismatching(buildByNumber) {
        return buildByNumber.filter(test_case => {
            return !matching_array.some(matcher => {
                return matcher.full_name === test_case.full_name;
            });
        });
    }

    const second_not_matching = getNthMismatching(secondBuildByBuildNumber);
    const first_not_matching = getNthMismatching(firstBuildByBuildNumber);

    //We now have 3 arrays, one with matching elements and 2 with unmatching elements
    let combined_json = [];
    if (!compareFilterMatch.isChecked && !compareFilterMismatch.isChecked) {
        combined_json = first_not_matching.concat(
            matching_array,
            second_not_matching
        );
    } else if (
        compareFilterMatch.isChecked &&
        !compareFilterMismatch.isChecked
    ) {
        combined_json = first_not_matching.concat(second_not_matching);
    } else if (
        !compareFilterMatch.isChecked &&
        compareFilterMismatch.isChecked
    ) {
        combined_json = matching_array;
    }

    return combined_json.map(({ full_name, status1, status2 }) => {
        return (
            <Row
                full_name={full_name}
                status1={status1}
                status2={status2}
                key={full_name}
            />
        );
    });
};

export default Body;
