import styled from 'styled-components';

export const FooterContainer = styled.footer`
    margin-top: auto;
    background: var(--titan-green);
    color: var(--nero-white);
    display: flex;
    align-items: center;
    min-height: var(--space-48);

    a {
        background-color: var(--titan-green);
        color: var(--nero-white);

        &:focus {
            outline-color: var(--nero-white);
        }
    }

    .underline {
        text-decoration: underline;
    }
`;

export const EpiIcon = styled.span`
    margin-left: var(--space-40);
    background: var(--nero-white);
    color: var(--titan-green);
    border-radius: var(--space-4);
    padding: 0 var(--space-8);
    font-weight: bolder;
`;

export const TextStyles = styled.span`
    margin-right: var(--space-8);
    margin-left: var(--space-24);
`;
