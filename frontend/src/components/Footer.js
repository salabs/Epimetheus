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

    tspan {
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
                <tspan>{packageJson.version}</tspan> {t('footer.powered')}{' '}
                <tspan>
                    <a href="https://www.siili.com">{t('footer.siili')}</a>
                </tspan>
                .
            </TextStyles>
        </FooterContainer>
    );
};

export default Footer;
