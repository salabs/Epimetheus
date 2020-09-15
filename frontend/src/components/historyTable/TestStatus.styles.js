import styled from 'styled-components';

export const DefinedData = styled.td`
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    background: ${props =>
        !props.status ? 'var(--hermanni-grey)' : 'var(--nero-white)'};
    border-top: ${props => props.position !== 0 && 'none !important'};
`;
