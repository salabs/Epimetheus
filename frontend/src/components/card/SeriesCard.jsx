import React from 'react';
import { pickIcon } from '../TestIcon';
import { useTranslation } from 'react-i18next';
import {
    CardSection,
    StatusSpan,
    InfoContainer,
    CardValue,
    CardHeading,
    CardSubTitle,
    CardTitle,
} from './SeriesCard.styles';

const SeriesCard = ({ data }) => {
    const [t] = useTranslation(['team']);

    const {
        id,
        name,
        builds,
        last_build,
        last_build_id,
        last_started,
        last_status,
    } = data;

    const LastStarted = last_started.slice(0, 16);
    const testStatusIcon = pickIcon(last_status);
    return (
        <CardSection aria-label={name}>
            <CardHeading>
                <CardTitle to={`/series/${id}/overview`}>{name}</CardTitle>
                <CardValue>{testStatusIcon}</CardValue>
            </CardHeading>
            <InfoContainer
                className="card-info-container"
                id={`${name}_series`}
                aria-label={`Series ${name}`}
            >
                {t('card.series.builds')} <CardValue>{builds}</CardValue>
            </InfoContainer>
            <div id={`${name}_builds`} aria-label={`Build ${last_build}`}>
                <CardSubTitle to={`/series/${id}/build/${last_build}/overview`}>
                    {t('card.last_build.title')} {last_build}
                </CardSubTitle>
                <InfoContainer className="card-info-container">
                    {t('card.last_build.build_id')}:{' '}
                    <CardValue>{last_build_id}</CardValue>
                </InfoContainer>
                <InfoContainer className="card-info-container">
                    {t('card.last_build.last_build_started')}:{' '}
                    <CardValue>{LastStarted}</CardValue>
                </InfoContainer>
                <InfoContainer className="card-info-container">
                    {t('card.last_build.last_status')}:{' '}
                    <StatusSpan status={last_status}>{last_status}</StatusSpan>
                </InfoContainer>
            </div>
        </CardSection>
    );
};

export default SeriesCard;
