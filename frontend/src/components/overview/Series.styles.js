import styled from 'styled-components';
import { overviewElement } from '../../styles/baseComponents';

export const ChartContainer = styled(overviewElement)`
    margin: 20px 40px 40px 0;
    background-color: var(--nero-white);
    min-width: ${props => props.minWidth};
`;

export const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Space Mono';
`;
