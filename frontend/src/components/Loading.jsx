import React from 'react';
import { LoadingDiv } from './Loading.styles';

const Loading = () => {
    return (
        <LoadingDiv
            role="status"
            aria-live="polite"
            aria-label="Loading"
            aria-relevant="all"
        >
            Loading
        </LoadingDiv>
    );
};

export default Loading;
