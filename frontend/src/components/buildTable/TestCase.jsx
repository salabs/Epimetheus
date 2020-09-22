import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledTests } from './TextCase.styles';

const TestCase = ({ testCases, index, suiteId, testId }) => {
    const testCase = testCases[index].test_case;
    const pathname = useLocation().pathname;
    const correctUrl = pathname.substring(0, pathname.lastIndexOf('/'));
    return (
        <StyledTests>
            <Link to={`${correctUrl}/suite/${suiteId}/test/${testId}/history`}>
                {testCase}
            </Link>
        </StyledTests>
    );
};

export default TestCase;
