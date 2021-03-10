import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TestCase = ({ testCases, index, suiteId, testId }) => {
    const testCase = testCases[index].test_case;
    const pathname = useLocation().pathname;
    const correctUrl = pathname.substring(0, pathname.lastIndexOf('/'));
    return (
        <td>
            <Link to={`${correctUrl}/suite/${suiteId}/test/${testId}/history`}>
                {testCase}
            </Link>
        </td>
    );
};

export default TestCase;
