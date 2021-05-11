import styled from 'styled-components';
import React from 'react';

export const Header = styled.div`
    color: var(--evidence-grey);
    margin: var(--space-8) 0;
`;

export const StyledDiv = styled(props => <div {...props} />).attrs(
    ({ customproperty }) => ({
        customproperty,
    })
)`
    display: flex;
    flex-direction: ${props => props.direction};
    border: 1px solid var(--evidence-grey);
    border-radius: var(--space-4);
    width: ${props => (props.direction === 'column' ? '10%' : '30%')};
    max-width: 230px;
    min-width: ${props => (props.direction === 'column' ? '200px' : '230px')};
    line-height: 30px;
    padding: 0 var(--space-8);

    @media only screen and (max-width: 1024px) {
        width: ${props => (props.direction === 'column' ? '20%' : '30%')};
    }
    @media only screen and (max-width: 768px) {
        width: 30%;
    }
`;
