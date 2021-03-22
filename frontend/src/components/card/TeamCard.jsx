import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardHeading } from './TeamCard.styles';
import { CardSection, InfoContainer, StatusSpan } from './card.styles';

const TeamCard = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    return (
        <CardSection className={`ta-${team}-card`} grid={false}>
            <CardHeading to={'/team/' + team}>{team}</CardHeading>
            <InfoContainer className="number-of-series">
                {t('series')}: <StatusSpan>{numberOfSeries}</StatusSpan>
            </InfoContainer>
        </CardSection>
    );
};

export default TeamCard;
