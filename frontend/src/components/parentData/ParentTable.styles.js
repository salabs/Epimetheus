import styled from 'styled-components';

export const Container = styled.div`
    padding: var(--space-8) 0 var(--space-16) 0;
`;

export const ContentBlockContainer = styled.div`
    padding: var(--space-8) 0;

    .title {
        display: block;
        color: var(--evidence-grey);
        font-size: 12px;
    }

    p {
        display: inline-block;
        margin: 0 var(--space-16) 0 0;
        font-size: 12px;
    }
`;

export const ParagraphContainer = styled.p`
    span:first-child {
        font-weight: bolder;
        display: inline-block;
        margin-right: var(--space-4);
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'PASS' ? 'var(--pirlo-blue)' : 'var(--nelson-purple)'};
`;
