import styled from 'styled-components';

export const StyledLabel = styled.label`
    margin-right: 20px;
    display: block;
    position: relative;

    span {
        padding-right: var(--space-8);

        svg {
            position: relative;
            top: -1px;
        }
    }
`;

export const StyledCheckbox = styled.input`
    appearance: none;
    opacity: 0;
    position: absolute;
    top: 7px;
    height: var(--space-16);
    width: var(--space-16);
    border-radius: 2px;

    &:focus {
        opacity: 1;
    }
`;
