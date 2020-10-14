import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    /* padding: 20px; */
    overflow: auto;
    width: 100%;

    /* @media only screen and (min-width: 1024px) {
        padding: 20px 40px;
    } */
`;

const MainContent = ({ children }) => {
    return <StyledDiv id="main-content">{children}</StyledDiv>;
};

export default MainContent;
