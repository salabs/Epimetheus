import styled from 'styled-components';

export const Header = styled.div`
    color: var(--evidence-grey);
    margin: var(--space-8) 0;
`;

export const StyledDiv = styled.div`
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

    span {
        padding-right: var(--space-8);
        position: relative;
        top: -1px;

        svg {
            position: relative;
            top: -1px;
        }
    }
`;

export const StyledLabel = styled.label`
    margin-right: 20px;
    display: block;
    position: relative;
`;

export const StyledInput = styled.input`
    appearance: none;
    opacity: 0;
    position: absolute;
    top: 6px;
    height: var(--space-16);
    width: var(--space-16);
    border-radius: 2px;

    &:focus {
        opacity: 1;
    }
`;
