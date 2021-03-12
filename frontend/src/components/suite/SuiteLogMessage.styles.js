import styled from 'styled-components';

export const TestMessage = styled.div`
    padding: 0.25rem 0rem;
    width: 100%;
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
            line-height: 30px;
            background: var(--nero-white);
            display: ${props => (props.open ? 'none' : 'inline-block')};
        }
    }

    & > div {
        display: inline-block;
        white-space: ${props => (props.open ? 'normal' : 'nowrap')};
    }
`;
