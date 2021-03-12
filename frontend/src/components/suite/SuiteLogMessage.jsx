import React, { useEffect, useRef, useState } from 'react';
import { TestMessage } from './SuiteLogMessage.styles';

const SuiteLogMessage = ({ message }) => {
    const [isOpen, setIsOpen] = useState(false);
    let canBeOpened = useRef(false);
    const content = React.createRef();
    const container = React.createRef();
    const [windowSize, setWindowSize] = useState([0, 0]);

    function updateWindowSize() {
        setWindowSize([window.innerWidth, window.innerHeight]);
    }

    useEffect(function updateWindowSizeOnResize() {
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    useEffect(
        function updateWindowSizeWhenMessageChanges() {
            updateWindowSize();
        },
        [message]
    );

    useEffect(
        function checkCanMessageBeOpened() {
            if (!isOpen) {
                canBeOpened.current =
                    content.current.offsetWidth > container.current.offsetWidth;
            }
        },
        [content, container, windowSize, isOpen]
    );

    function open() {
        if (canBeOpened.current || isOpen) {
            return setIsOpen(!isOpen);
        }
    }

    return (
        <TestMessage
            title={message}
            role="button"
            className={canBeOpened.current ? 'can-be-opened' : ''}
            tabIndex={canBeOpened.current ? 0 : -1}
            ref={container}
            onClick={() => open()}
            onKeyPress={() => open()}
            open={isOpen}
        >
            <div ref={content}>{message}</div>
        </TestMessage>
    );
};

export default SuiteLogMessage;
