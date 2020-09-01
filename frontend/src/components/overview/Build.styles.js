import styled from 'styled-components';
import { overviewElement } from '../../styles/baseComponents';

export const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const ChartContainer = styled(overviewElement)`
    margin: 20px 40px 40px 0;
    background-color: var(--nero-white);
    width: ${props => props.width};
    height: ${props => props.height};
`;

export const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Space Mono';
`;
