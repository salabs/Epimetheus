import styled from 'styled-components';

export const Container = styled.div`
    background: var(--hermanni-grey-lighter);
    padding: 24px 326px 24px 190px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    @media only screen and (max-width: 1280px) {
        padding: 12px 190px 12px 100px;
    }
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
