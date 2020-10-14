import styled from 'styled-components';

export const FrontPage = styled.main`
    max-width: 800px;
    width: 100%;
    padding: 24px 0 24px 108px;

    @media only screen and (max-width: 1280px) {
        padding: 12px 0 12px 48px;
    }
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 20px;

    div {
        min-height: 100px;
        max-width: 150px;
    }
`;
