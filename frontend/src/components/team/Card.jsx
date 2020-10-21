import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardSection, StyledSpan } from './Card.styles';
import { H4 } from './SelectedTeam.styles';

const Card = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();

    return (
        <CardSection
            onClick={() => history.push(`/team/${team}`)}
            className={`ta-${team}-card`}
            role={'presentation'}
        >
            <H4>{team}</H4>
            <div>
                {t('series')}:{' '}
                <StyledSpan className="test">{numberOfSeries}</StyledSpan>
            </div>
        </CardSection>
    );
};

export default Card;
