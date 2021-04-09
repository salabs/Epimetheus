import React from 'react';
import { dashify } from '../../utils/helpers';

const TestCase = ({ test_case, position }) => (
    <td data-ta={`${dashify(test_case)}`} position={position}>
        {test_case}
    </td>
);

export default TestCase;
