import React, { useState } from 'react';
import { TestMessage } from './SuiteLogMessage.styles';

const SuiteLogMessage = ({ message }) => {
    const [isOpen, setIsopen] = useState(false);

    return (
        <div>
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
        </div>
    );
};

export default SuiteLogMessage;
