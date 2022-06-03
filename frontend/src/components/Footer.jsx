import React from 'react';
import { useTranslation } from 'react-i18next';
import packageJson from '../../package.json';
import ExternalLink from './externalLink/ExternalLink';
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
                <ExternalLink
                    url="https://www.siili.com"
                    label={t('footer.siili')}
                    color="nero white"
                />
                .
            </TextStyles>
        </FooterContainer>
    );
};

export default Footer;
