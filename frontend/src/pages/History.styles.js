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
    max-width: 900px;
    margin: 24px 0;
    padding-left: 198px;

    @media only screen and (max-width: 1024px) {
        padding-left: 108px;
        max-width: 800px;
    }
`;

export const ParentContainer = styled(HeritanceContainer)`
    padding: 24px 0;
    flex-direction: column;

    h4 {
        padding-left: 198px;

        @media only screen and (max-width: 1024px) {
            padding-left: 108px;
        }
    }
`;
