import styled from 'styled-components';
import React from 'react';
export const ParentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    column-gap: var(--space-24);
`;

export const ChartContainer = styled(props => <div {...props} />).attrs(
    ({ customProperty }) => ({
        customProperty,
    })
)`
    border: 1px solid var(--evidence-grey);
    padding: var(--space-8);
    margin: 0 0 var(--space-24) 0;
    width: 100%;
    max-width: calc(var(--max-page-width) / 1.6);
`;

export const ElementHeader = styled.h2`
    font-family: 'Hack';
    font-size: 20px;
    text-align: center;
    margin-top: 0;
`;

export const TableHolder = styled.div`
    border: 1px solid var(--evidence-grey);
    margin-bottom: var(--space-24);
    padding: var(--space-16);

    &:first-of-type {
        flex: 2;
    }

    &:last-of-type {
        flex: 3;
    }
`;
