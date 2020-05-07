import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const TestCase = ({ testCases, index, suiteId, testId }) => {
    const testCase = testCases[index].test_case;
    const history = useHistory();
    return (
        <td>
            <Link
                to={`${history.location.pathname}/suite/${suiteId}/test/${testId}`}
            >
                {testCase}
            </Link>
        </td>
    );
};

export default TestCase;
