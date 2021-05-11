import styled from 'styled-components';
import React from 'react';
export const PageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const FlexDiv = styled(props => <div {...props} />).attrs(
    ({ customProperty }) => ({
        customProperty,
    })
)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

export const ChartContainer = styled.div`
    padding: var(--space-8);
    border: 1px solid var(--evidence-grey);
    margin: 0 0 var(--space-24) 0;
    background-color: var(--nero-white);
    width: ${props => props.width};
    height: ${props => props.height};
`;

export const ElementHeader = styled.h2`
    font-family: 'Hack';
    font-size: 20px;
    text-align: center;
    margin: 0;
`;
