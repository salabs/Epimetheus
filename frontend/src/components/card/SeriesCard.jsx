import React from 'react';
import PropTypes from 'prop-types';
import { pickIcon } from '../../utils/TestIcon';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { CardValue, CardSubTitle, CardTitle } from './SeriesCard.styles';
import {
    CardSection,
    CardHeading,
    InfoContainer,
    StatusSpan,
} from './card.styles';

const SeriesCard = ({ data }) => {
    const [t] = useTranslation(['team']);

    const params = useParams();

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
        <CardSection aria-label={name} grid={true}>
            <CardHeading>
                <CardTitle
                    to={`/team/${params.name}/series/${id}/overview`}
                    id={`${name}_series`}
                >
                    {name}
                </CardTitle>
                <CardValue>{testStatusIcon}</CardValue>
            </CardHeading>
            <InfoContainer
                className="card-info-container"
                aria-label={`Series ${name}`}
            >
                {t('card.series.builds')} <CardValue>{builds}</CardValue>
            </InfoContainer>
            <div aria-label={`Build ${last_build}`}>
                <CardSubTitle
                    to={`/team/${params.name}/series/${id}/build/${last_build}/overview`}
                    id={`${name}_builds`}
                >
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

SeriesCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        builds: PropTypes.number,
        last_build: PropTypes.number,
        last_build_id: PropTypes.string,
        last_started: PropTypes.string,
        last_status: PropTypes.string,
    }).isRequired,
};

export default SeriesCard;
