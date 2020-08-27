// eslint-disable-next-line
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Pass } from '../images/success.svg';
import { ReactComponent as Fail } from '../images/fail.svg';
import { ReactComponent as Skipped } from '../images/skip.svg';
import { ReactComponent as NotFound } from '../images/not-found.svg';

const FrontPage = styled.main`
    max-width: 800px;
    width: 100%;
    margin-left: 40px;
`;

const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 20px;

    div {
        /* flex-direction: column;
        overflow: hidden;
        white-space: nowrap; */
        min-height: 100px;
        max-width: 150px;
    }
`;

const Frontpage = () => {
    const [t] = useTranslation(['frontpage']);
    return (
        <FrontPage id="frontpage">
            <h1>{t('title')}</h1>
            <p>{t('opening_paragraph')}</p>

            <h2>{t('section.roadmap.title')}</h2>
            <p>{t('section.roadmap.opening_paragraph')}</p>
            <ul>
                <li>{t('section.roadmap.ms_202002')}</li>
                <li>{t('section.roadmap.ms_202003_1')}</li>
                <li>{t('section.roadmap.ms_202003_2')}</li>
            </ul>
            <h2>{t('section.terminology.title')}</h2>
            <p>{t('section.terminology.opening_paragraph')}</p>
            <ul>
                <li>{t('section.terminology.series')}</li>
                <li>{t('section.terminology.suite')}</li>
                <li>{t('section.terminology.test')}</li>
                <li>{t('section.terminology.team')}</li>
                <li>
                    <a href={t('section.terminology.testarchiver.link_url')}>
                        {t('section.terminology.testarchiver.link_text')}
                    </a>
                    {t('section.terminology.testarchiver.description')}
                </li>
                <li>
                    <a href={t('section.terminology.chage_engine.link_url')}>
                        {t('section.terminology.chage_engine.link_text')}
                    </a>
                    {t('section.terminology.chage_engine.description')}
                </li>
            </ul>

            <h2>{t('section.icons.title')}</h2>
            <p>{t('section.icons.opening_paragraph')}</p>
            <IconsContainer>
                <div>
                    {' '}
                    <Pass width="150" height="75" viewBox="0 0 60 55" />
                    <span>Passed test</span>
                </div>
                <div>
                    <Fail width="150" height="75" viewBox="0 0 60 55" />
                    <span>Failed test</span>
                </div>
                <div>
                    <Skipped width="150" height="75" viewBox="0 0 60 55" />
                    <span>Skipped test (result file found)</span>
                </div>
                <div>
                    <NotFound width="150" height="75" viewBox="0 0 60 55" />
                    <span>Test not found in selected run</span>
                </div>
            </IconsContainer>

            <h2>{t('section.views.title')}</h2>
            <ul>
                <li>{t('section.views.history')}</li>
                <li>{t('section.views.team')}</li>
                <li>{t('section.views.suite')}</li>
            </ul>

            <h2>{t('section.feedback.title')}</h2>
            <p>
                {t('section.feedback.text')}
                <a href={t('section.feedback.link_url')}>
                    {t('section.feedback.link_text')}
                </a>
                .
            </p>

            <h2>{t('section.contribute.title')}</h2>
            <p>
                {t('section.contribute.text')}
                <a href={t('section.contribute.link_url')}>
                    {t('section.contribute.link_text')}
                </a>
                .
            </p>
            <h2>{t('section.licence.title')}</h2>
            <p>
                {t('section.licence.text')}
                <a href={t('section.licence.link_url')}>
                    {t('section.licence.link_text')}
                </a>
                .
            </p>
        </FrontPage>
    );
};

export default Frontpage;
