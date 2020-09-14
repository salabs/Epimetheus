import styled from 'styled-components';

export const StyledData = styled.td`
    padding: 10px;
    text-align: left;
    vertical-align: middle;
    background: var(--nero-white);
    border-top: ${props => props.position !== 0 && 'none !important'};
`;
