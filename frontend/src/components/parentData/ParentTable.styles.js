import styled from 'styled-components';

export const Container = styled.div`
    background: var(--hermanni-grey-lighter);
    padding: var(--space-24) 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

export const ParagraphContainer = styled.p`
    display: flex;
    padding: 0 8px;

    span:first-child {
        font-weight: bolder;
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'PASS' ? 'var(--pirlo-blue)' : 'var(--nelson-purple)'};
`;
