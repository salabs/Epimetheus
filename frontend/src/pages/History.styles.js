import styled from 'styled-components';

export const RelativeMain = styled.main`
    position: relative;
`;

export const HeritanceContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const FilterContainer = styled(HeritanceContainer)`
    max-width: 800px;
`;

export const ParentContainer = styled(HeritanceContainer)`
    padding: 20px 0;
    flex-direction: column;
`;
