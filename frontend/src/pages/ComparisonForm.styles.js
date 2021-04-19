import styled from 'styled-components';

export const ComparisonFormContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-64);
    row-gap: var(--space-32);

    & > div {
        flex: 1;
        min-width: 250px;

        label + div {
            margin-bottom: var(--space-24);
        }
    }
`;

export const ComparisonAction = styled.div`
    text-align: center;
    margin-top: var(--space-24);
`;
