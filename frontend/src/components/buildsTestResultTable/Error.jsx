import React from 'react';
import { ErrorMsg } from './Error.styles';

const Error = ({ build }) => {
    const errorMessage = build.messages[0] || '';
    const CHARACTER_LIMIT = 200;

    if (errorMessage !== '' && errorMessage.message.length > CHARACTER_LIMIT) {
        errorMessage.message =
            errorMessage.message.substring(0, CHARACTER_LIMIT) + '...';
    }

    return (
        <ErrorMsg build={build}>
            <span>{errorMessage.message}</span>
        </ErrorMsg>
    );
};

export default Error;
