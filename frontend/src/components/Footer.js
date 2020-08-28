import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import packageJson from '../../package.json';

const FooterContainer = styled.div`
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

const EpiIcon = styled.span`
    margin-left: 40px;
    background: var(--nero-white);
    color: var(--titan-green);
    border-radius: 6px;
    padding: 0 7px;
    font-weight: bolder;
`;

const TextStyles = styled.span`
    margin-left: 20px;
`;

const Footer = () => {
    const [t] = useTranslation(['mainnav']);

    return (
        <FooterContainer>
            <EpiIcon>{t('footer.E')}</EpiIcon>
            <TextStyles>
                {t('footer.epimetheus')} {t('footer.version')}{' '}
                <span className="underline">{packageJson.version}</span>{' '}
                {t('footer.powered')}{' '}
                <span className="underline">
                    <a href="https://www.siili.com">{t('footer.siili')}</a>
                </span>
                .
            </TextStyles>
        </FooterContainer>
    );
};

export default Footer;
