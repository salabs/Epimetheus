import styled from 'styled-components';

export const RelativeMain = styled.main`
    position: relative;
`;

export const HeritanceContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const FilterContainer = styled(HeritanceContainer)`
    justify-content: space-between;
    margin: 24px 0;
`;

export const ParentContainer = styled(HeritanceContainer)`
    padding: 24px 0;
    flex-direction: column;
`;
