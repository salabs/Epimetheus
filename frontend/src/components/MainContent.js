// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const MainContent = ({ children }) => {
  const mainStyles = css`
    padding: 20px;
    overflow: auto;
    width: 100%;
  `;

  return (
    <div id="main-content" css={mainStyles}>
      {children}
    </div>
  );
};

export default MainContent;
