import styled from 'styled-components';

export const DefinedData = styled.td`
    padding: 10px;
    text-align: center;
    vertical-align: middle;
    border-top: ${props => props.position !== 0 && 'none !important'};
`;
