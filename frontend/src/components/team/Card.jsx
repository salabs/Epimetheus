import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardSection, StyledSpan, CardHeading } from './Card.styles';
//import {Link} from 'react-router-dom';

const Card = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();
    return (
        <div
            role="link"
            tabIndex="0"
            onClick={() => history.push(`/team/${team}`)}
            onKeyPress={() => history.push(`/team/${team}`)}
            data-href={'/team/' + team}
        >
            <CardSection className={`ta-${team}-card`}>
                <CardHeading>{team}</CardHeading>
                <div>
                    {t('series')}:{' '}
                    <StyledSpan className="test">{numberOfSeries}</StyledSpan>
                </div>
            </CardSection>
        </div>
    );
};

export default Card;
