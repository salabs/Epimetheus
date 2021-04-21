import React, { Fragment } from 'react';
import { useStateValue } from '../../contexts/state';
import Suite from './Suite';
import { useQueryParams } from '../../hooks/useQuery';

const Body = ({ history, max_build_num }) => {
    const [{ amountOfBuilds }] = useStateValue();
    const queryParams = useQueryParams();

    const tableBody = history.map(
        ({ suite_full_name, test_cases, suite_id }) => {
            let filteredTestCases = test_cases;
            queryParams.getAll('tag').includes('Passing') &&
                (filteredTestCases = filteredTestCases.filter(({ builds }) => {
                    return builds
                        .slice(0, amountOfBuilds)
                        .some(({ test_status }) => test_status !== 'PASS');
                }));
            queryParams.getAll('tag').includes('Failing') &&
                (filteredTestCases = filteredTestCases.filter(({ builds }) => {
                    return builds
                        .slice(0, amountOfBuilds)
                        .some(({ test_status }) => test_status !== 'FAIL');
                }));

            return (
                <Fragment key={suite_id}>
                    {filteredTestCases.map(({ test_case, builds }, index) => {
                        return (
                            <Suite
                                key={index}
                                test_case={test_case}
                                index={index}
                                suite={suite_full_name}
                                test_cases={filteredTestCases}
                                builds={builds}
                                max_build_num={max_build_num}
                            />
                        );
                    })}
                </Fragment>
            );
        }
    );
    return <tbody>{tableBody}</tbody>;
};

export default Body;
