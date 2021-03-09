import styled from 'styled-components';
import { overviewElement } from '../../styles/baseComponents';

export const ParentContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const ChartContainer = styled(overviewElement)`
    margin: var(--space-24) var(--space-40) var(--space-40) 0;
    background-color: var(--nero-white);
    width: ${props => props.width};
`;

export const ElementHeader = styled.h3`
    text-align: center;
    margin: var(--space-8);
    font-family: 'Hack';
`;
