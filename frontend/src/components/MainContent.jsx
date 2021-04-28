import React from 'react';
import PropTypes from 'prop-types';
import { StyledDiv } from './MainContent.styles';

const MainContent = ({ children }) => {
    return <StyledDiv id="main-content">{children}</StyledDiv>;
};

MainContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContent;
