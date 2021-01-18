import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardSection, StyledSpan, CardHeading } from './Card.styles';

const Card = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();
    return (
        <CardSection
            onClick={() => history.push(`/team/${team}`)}
            className={`ta-${team}-card`}
            role={'presentation'}
        >
            <CardHeading>{team}</CardHeading>
            <div>
                {t('series')}:{' '}
                <StyledSpan className="test">{numberOfSeries}</StyledSpan>
            </div>
        </CardSection>
    );
};

export default Card;
