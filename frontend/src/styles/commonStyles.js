import { css } from '@emotion/core';

export const filterStyles = css`
  position: relative;
  margin-top: 10px;
  .filter-container {
    display: flex;
  }
  .loading-state {
    height: 30px;
    line-height: 30px;
    padding: 0;
    &:after {
      margin: 0;
      padding: 0;
      line-height: 30px;
      font-size: 1rem;
      content: '...';
      vertical-align: bottom;
      display: inline-block;
      width: 0px;
      height: 30px;
      animation-name: lastrun-loader;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      overflow: hidden;
    }
    @keyframes lastrun-loader {
      from {
        width: 0;
      }
      to {
        width: 140px;
      }
    }
  }
`;
