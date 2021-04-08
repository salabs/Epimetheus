﻿import React from 'react';
import { useTranslation } from 'react-i18next';
import packageJson from '../../package.json';
import { FooterContainer, EpiIcon, TextStyles } from './Footer.styles';

const Footer = () => {
    const [t] = useTranslation(['mainnav']);

    return (
        <FooterContainer>
            <EpiIcon role="presentation" aria-hidden="true">
                {t('footer.E')}
            </EpiIcon>
            <TextStyles>
                {t('footer.epimetheus')} {t('footer.version')}{' '}
                <span className="underline">{packageJson.version}</span>{' '}
                {t('footer.powered')}{' '}
                <a
                    href="https://www.siili.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('footer.siili')}
                </a>
                .
            </TextStyles>
        </FooterContainer>
    );
};

export default Footer;
