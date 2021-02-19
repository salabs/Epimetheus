﻿import React from 'react';
import { useTranslation } from 'react-i18next';
import packageJson from '../../package.json';
import { FooterContainer, EpiIcon, TextStyles } from './Footer.styles';

const Footer = () => {
    const [t] = useTranslation(['mainnav']);

    return (
        <FooterContainer>
            <EpiIcon role="img" aria-label="Small Epimetheus logo">
                {t('footer.E')}
            </EpiIcon>
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
