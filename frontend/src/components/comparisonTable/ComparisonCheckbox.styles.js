import styled from 'styled-components';

export const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid var(--evidence-grey);
    border-radius: var(--space-4);
    max-width: 300px;
    line-height: 30px;
    padding: 0 var(--space-8);
    margin-bottom: var(--space-24);

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
