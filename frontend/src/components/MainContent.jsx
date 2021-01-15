import React from 'react';
import { StyledDiv } from './MainContent.styles';

const MainContent = ({ children }) => {
    return <main><StyledDiv id="main-content">{children}</StyledDiv></main>;
};

export default MainContent;
