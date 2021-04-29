import React from 'react';
import { buildPropType } from '../../utils/PropTypes';
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

Error.propTypes = {
    build: buildPropType.isRequired,
};

export default Error;
