import React, { useState } from 'react';
import { TestMessage } from './SuiteLogMessage.styles';

const SuiteLogMessage = ({ message }) => {
    const [isOpen, setIsopen] = useState(false);

    return (
        <TestMessage
            title={message}
            role="button"
            tabIndex="0"
            onClick={() => setIsopen(!isOpen)}
            onKeyDown={() => setIsopen(!isOpen)}
            open={isOpen}
        >
            {message}
        </TestMessage>
    );
};

export default SuiteLogMessage;
