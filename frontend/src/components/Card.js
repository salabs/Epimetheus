import React from 'react';
import { useHistory } from 'react-router-dom';
import theme from '../styles/theme';
import { useTranslation } from 'react-i18next';

const Card = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();

    return (
        <div
            style={theme.flexItem}
            onClick={() => history.push(`/team/${team}`)}
            role={'presentation'}
            id={team + "_card"}
        >
            <h3>{team}</h3>
            <div>
                {t('series')}: {numberOfSeries}
            </div>
        </div>
    );
};

export default Card;
