import styled from 'styled-components';

export const TestMessage = styled.div`
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
