import styled from 'styled-components';

export const SuiteRow = styled.tr`
    border-top: ${props => props.position !== 0 && 'none !important'};
`;

export const StyledTestRow = styled.td`
    text-align: right !important;
    border-top: none;
`;
