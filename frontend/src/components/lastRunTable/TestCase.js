import React from 'react';

const TestCase = ({ testCases, index }) => {
  const testCase = testCases[index].test_case;

  return <td>{testCase}</td>;
};

export default TestCase;
