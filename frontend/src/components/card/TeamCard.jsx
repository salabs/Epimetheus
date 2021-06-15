import React from 'react';
import PropTypes from 'prop-types';
import { CardHeading } from './TeamCard.styles';
import { CardSection } from './card.styles';

const TeamCard = ({ team }) => {
    return (
        <CardSection grid={false}>
            <CardHeading to={'/team/' + team} className={`ta-${team}-card`}>
                {team}
            </CardHeading>
        </CardSection>
    );
};

TeamCard.propTypes = {
    team: PropTypes.string.isRequired,
};

export default TeamCard;
