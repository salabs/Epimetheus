import styled from 'styled-components';

export const Container = styled.div`
    background: var(--hermanni-grey);
    padding: 40px 8px 40px 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    p {
        display: flex;
        padding: 0 10px;

        span:first-child {
            padding-right: 10px;
            font-weight: bolder;
        }
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'PASS' ? 'var(--pirlo-blue)' : 'var(--nelson-purple)'};
`;
