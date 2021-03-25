import styled from 'styled-components';
import { overviewElement } from '../../styles/baseComponents';

export const ParentContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const ChartContainer = styled(overviewElement)`
    margin: 0 0 var(--space-24) 0;
    width: 100%;
    max-width: calc(var(--max-page-width) / 1.6);
`;

export const ElementHeader = styled.h2`
    font-family: 'Hack';
    font-size: 20px;
    text-align: center;
    margin: 0 0 var(--space-8) 0;
`;
