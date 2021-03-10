import styled from 'styled-components';

export const ErrorMsg = styled.td`
    font-size: 10px;
    line-height: 14px;
    & > span {
        display: block;
        background: ${props =>
            props.build.status === 'FAIL' && 'var(--arabia-red) !important'};
    }
`;
