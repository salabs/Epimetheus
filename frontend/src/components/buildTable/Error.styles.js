import styled from 'styled-components';

export const ErrorMsg = styled.td`
    background: ${props =>
        props.build.status === 'FAIL' && 'var(--arabia-red) !important'};
    font-size: 10px;
    line-height: 14px;
`;
