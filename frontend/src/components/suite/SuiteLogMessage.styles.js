import styled from 'styled-components';

export const TestMessage = styled.div`
    width: calc(100vw / 2.3);
    word-break: break-word;
    overflow: hidden;

    &.can-be-opened {
        cursor: pointer;
        position: relative;

        &::after {
            content: '...';
            position: absolute;
            top: 1px;
            right: 0;
            width: 30px;
            line-height: 18px;
            background: var(--nero-white);
            display: ${props => (props.open ? 'none' : 'inline-block')};
        }
    }

    &[tabindex='-1']:focus {
        outline: 0;
    }

    & > div {
        display: inline-block;
        white-space: ${props => (props.open ? 'normal' : 'nowrap')};
    }
`;
