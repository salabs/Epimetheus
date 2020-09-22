import React from 'react';
import { dashify } from '../../utils/helpers';
import { StyledData } from './TestCase.styles';

const TestCase = ({ test_case, position }) => (
    <StyledData data-ta={`${dashify(test_case)}`} position={position}>
        {test_case}
    </StyledData>
);

export default TestCase;
