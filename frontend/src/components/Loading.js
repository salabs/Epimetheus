// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Loading = () => {
    const loadingStyles = css`
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
            animation-name: history-loader;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            overflow: hidden;
        }
        @keyframes history-loader {
            from {
                width: 0;
            }
            to {
                width: 140px;
            }
        }
    `;

    return (
        <div
            css={loadingStyles}
            role="status"
            aria-live="polite"
            aria-label="Loading"
            aria-relevant="all"
        >
            Loading
        </div>
    );
};

export default Loading;
