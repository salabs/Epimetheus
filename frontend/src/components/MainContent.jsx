import React from 'react';
import { StyledDiv } from './MainContent.styles';

const MainContent = ({ children }) => {
    return <StyledDiv id="main-content">{children}</StyledDiv>;
};

export default MainContent;
