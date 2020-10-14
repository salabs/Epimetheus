import styled from 'styled-components';

export const ParentInfo = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 24px 0;
`;

export const FlexDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const FlexColumn = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 600px;
    padding-left: 198px;

    @media only screen and (max-width: 1280px) {
        width: 500px;
        padding-left: 108px;
    }
`;
