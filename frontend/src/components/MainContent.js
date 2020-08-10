// eslint-disable-next-line
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    padding: 20px;
    overflow: auto;
    width: 100%;
`;

const MainContent = ({ children }) => {
    return <StyledDiv id="main-content">{children}</StyledDiv>;
};

export default MainContent;
