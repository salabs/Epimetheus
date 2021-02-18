import styled from 'styled-components';

export const Container = styled.div`
    padding: var(--space-8) 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%;
`;

export const ParagraphContainer = styled.p`
    span:first-child {
        font-weight: bolder;
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'PASS' ? 'var(--pirlo-blue)' : 'var(--nelson-purple)'};
`;
