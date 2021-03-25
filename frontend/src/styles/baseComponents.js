import styled from 'styled-components';

export const ContainerGrid12 = styled.div`
    max-width: calc(var(--max-page-width) + calc(100% / 12) + calc(100% / 12));
    padding-right: calc(100% / 12);
    padding-left: calc(100% / 12);
    margin: 0 auto;
`;

export const ContentGrid6 = styled.div`
    max-width: 100%;
    margin: 0 calc(100% / 12);
`;
