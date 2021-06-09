import React from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../images/SvgIcon';
import ExternalLink from '../components/externalLink/ExternalLink';
import { IconsContainer } from './Frontpage.styles';
import { ContentGrid6, ContainerGrid12 } from '../styles/baseComponents';

const Frontpage = () => {
    const [t] = useTranslation(['frontpage']);
    return (
        <div robot_id="frontpage" id="frontpage">
            <ContainerGrid12>
                <ContentGrid6>
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
                            <ExternalLink
                                url={t(
                                    'section.terminology.testarchiver.link_url'
                                )}
                                label={t(
                                    'section.terminology.testarchiver.link_text'
                                )}
                            />
                            {t('section.terminology.testarchiver.description')}
                        </li>
                        <li>
                            <ExternalLink
                                url={t(
                                    'section.terminology.chage_engine.link_url'
                                )}
                                label={t(
                                    'section.terminology.chage_engine.link_text'
                                )}
                            />
                            {t('section.terminology.chage_engine.description')}
                        </li>
                    </ul>

                    <h2>{t('section.icons.title')}</h2>
                    <p>{t('section.icons.opening_paragraph')}</p>
                    <IconsContainer>
                        <div>
                            {' '}
                            <SvgIcon
                                svg="success"
                                width={150}
                                height={35}
                                viewBox="0 0 20 25"
                            />
                            <span>{t('section.icons.pass')}</span>
                        </div>
                        <div>
                            <SvgIcon
                                svg="fail"
                                width={150}
                                height={35}
                                viewBox="0 0 20 25"
                            />
                            <span>{t('section.icons.fail')}</span>
                        </div>
                        <div>
                            <SvgIcon
                                svg="skip"
                                width={150}
                                height={35}
                                viewBox="0 0 20 25"
                            />
                            <span>{t('section.icons.skipped')}</span>
                        </div>
                        <div>
                            <SvgIcon
                                svg="not-found"
                                width={150}
                                height={35}
                                viewBox="0 0 20 25"
                            />
                            <span>{t('section.icons.not_found')}</span>
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
                        <ExternalLink
                            url={t('section.feedback.link_url')}
                            label={t('section.feedback.link_text')}
                        />
                        .
                    </p>

                    <h2>{t('section.contribute.title')}</h2>
                    <p>
                        {t('section.contribute.text')}
                        <ExternalLink
                            url={t('section.contribute.link_url')}
                            label={t('section.contribute.link_text')}
                        />
                        .
                    </p>
                    <h2>{t('section.licence.title')}</h2>
                    <p>
                        {t('section.licence.text')}
                        <ExternalLink
                            url={t('section.licence.link_url')}
                            label={t('section.licence.link_text')}
                        />
                        .
                    </p>
                </ContentGrid6>
            </ContainerGrid12>
        </div>
    );
};

export default Frontpage;
