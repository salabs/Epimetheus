import React from 'react';
import { useHistory } from 'react-router-dom';
import { pickIcon } from '../TestIcon';
import { useTranslation } from 'react-i18next';
import {
    CardSection,
    HoverDiv,
    StatusSpan,
    InfoContainer,
    CardValue,
    CardHeading,
    CardSubTitle,
} from './SeriesCard.styles';

const SeriesCard = ({ data }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();

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
        <CardSection aria-label={name} tabIndex="0">
            <div className={'cardHeading'}>
                <CardHeading>{name} </CardHeading>
                <CardValue className="cardValue">{testStatusIcon}</CardValue>
            </div>
            <HoverDiv
                className="series"
                id={`${name}_series`}
                onClick={() => history.push(`/series/${id}/overview`)}
                role={'link'}
                href={`/series/${id}/overview`}
                aria-label={`Series ${name}`}
            >
                <InfoContainer className="cardInfoContainer">
                    {t('card.series.builds')}{' '}
                    <CardValue className="cardValue">{builds}</CardValue>
                </InfoContainer>
            </HoverDiv>
            <HoverDiv
                className="builds"
                id={`${name}_builds`}
                onClick={() =>
                    history.push(`/series/${id}/build/${last_build}/overview`)
                }
                role={'link'}
                href={`/series/${id}/build/${last_build}/overview`}
            >
                <CardSubTitle>
                    {t('card.last_build.title')} {last_build}
                </CardSubTitle>
                <InfoContainer className="cardInfoContainer">
                    {t('card.last_build.build_id')}:{' '}
                    <CardValue className="cardValue">{last_build_id}</CardValue>
                </InfoContainer>
                <InfoContainer className="cardInfoContainer">
                    {t('card.last_build.last_build_started')}:{' '}
                    <CardValue className="cardValue">{LastStarted}</CardValue>
                </InfoContainer>
                <InfoContainer className="cardInfoContainer">
                    {t('card.last_build.last_status')}:{' '}
                    <StatusSpan className="cardValue" status={last_status}>
                        {last_status}
                    </StatusSpan>
                </InfoContainer>
            </HoverDiv>
        </CardSection>
    );
};

export default SeriesCard;
