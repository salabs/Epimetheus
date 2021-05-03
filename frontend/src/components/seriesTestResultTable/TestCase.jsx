import React from 'react';
import PropTypes from 'prop-types';
import { dashify } from '../../utils/helpers';

const TestCase = ({ test_case, position }) => (
    <td data-ta={`${dashify(test_case)}`} position={position}>
        {test_case}
    </td>
);

TestCase.propTypes = {
    test_case: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
};

export default TestCase;
