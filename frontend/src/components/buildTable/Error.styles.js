import styled from 'styled-components';

export const ErrorMsg = styled.td`
    background: ${props =>
        props.build.status === 'FAIL' && 'var(--arabia-red) !important'};
`;
