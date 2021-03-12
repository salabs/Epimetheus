import styled from 'styled-components';
import { overviewElement } from '../../styles/baseComponents';

export const PageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

export const ChartContainer = styled(overviewElement)`
    margin: 0 0 var(--space-24) 0;
    background-color: var(--nero-white);
    width: ${props => props.width};
    height: ${props => props.height};
`;

export const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Hack';
`;
