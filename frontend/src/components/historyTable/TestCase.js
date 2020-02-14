import React from 'react';
import { dashify } from '../../helpers';

const TestCase = ({ test_case }) => (
  <td data-ta={`${dashify(test_case)}`}>{test_case}</td>
);

export default TestCase;
