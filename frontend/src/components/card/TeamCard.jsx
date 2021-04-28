import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CardHeading } from './TeamCard.styles';
import { CardSection, InfoContainer, StatusSpan } from './card.styles';

const TeamCard = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    return (
        <CardSection grid={false}>
            <CardHeading to={'/team/' + team} className={`ta-${team}-card`}>
                {team}
            </CardHeading>
            <InfoContainer className="number-of-series">
                {t('series')}: <StatusSpan>{numberOfSeries}</StatusSpan>
            </InfoContainer>
        </CardSection>
    );
};

TeamCard.propTypes = {
    team: PropTypes.string.isRequired,
    numberOfSeries: PropTypes.number.isRequired,
};

export default TeamCard;
