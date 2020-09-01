import styled from 'styled-components';

export const FooterContainer = styled.div`
    margin-top: auto;
    background: var(--titan-green);
    color: var(--nero-white);
    display: flex;
    align-items: center;
    min-height: 50px;

    a {
        background: var(--titan-green);
        color: var(--nero-white) !important;
    }

    .underline {
        text-decoration: underline;
    }
`;

export const EpiIcon = styled.span`
    margin-left: 40px;
    background: var(--nero-white);
    color: var(--titan-green);
    border-radius: 6px;
    padding: 0 7px;
    font-weight: bolder;
`;

export const TextStyles = styled.span`
    margin-left: 20px;
`;
