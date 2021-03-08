import styled from 'styled-components';

export const RelativeMain = styled.main`
    position: relative;
`;

export const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: var(--space-24) 0 var(--space-16) 0;

    > div {
        margin-right: var(--space-24);
        margin-bottom: var(--space-24);
    }
`;

export const ParentContainer = styled.div`
    background: var(--hermanni-grey-lighter);
`;
