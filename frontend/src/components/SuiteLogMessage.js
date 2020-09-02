﻿import React, { useState } from 'react';
import styled from 'styled-components';

const TestMessage = styled.div`
    padding: 0.25rem 0rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    white-space: ${props => (props.open ? 'normal' : 'nowrap')};
    :hover {
        cursor: pointer;
    }
`;

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