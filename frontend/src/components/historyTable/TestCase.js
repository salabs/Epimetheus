import React from 'react';
import { dashify } from '../../utils/helpers';
import styled from 'styled-components';

const StyledData = styled.td`
    padding: 10px;
    border: 1px solid black;
    text-align: left;
    vertical-align: middle;
    background: var(--nero-white);
`;

const TestCase = ({ test_case }) => (
    <StyledData data-ta={`${dashify(test_case)}`}>{test_case}</StyledData>
);

export default TestCase;
