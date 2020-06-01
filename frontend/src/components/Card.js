import React from 'react';
import { useHistory } from 'react-router-dom';
import theme from '../styles/theme';
import { useTranslation } from 'react-i18next';
import { css, jsx } from '@emotion/core';

const Card = ({ team, numberOfSeries }) => {
    const header = css`
        font-size: 14px;
    `;

    const [t] = useTranslation(['team']);
    let history = useHistory();

    return (
        <div
            style={theme.flexItem}
            onClick={() => history.push(`/team/${team}`)}
            role={'presentation'}
        >
            <h3 css={header}>{team}</h3>
            <div>
                {t('series')}: {numberOfSeries}
            </div>
        </div>
    );
};

export default Card;
