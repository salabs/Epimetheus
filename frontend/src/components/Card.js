import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Card = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();

    const Mongolia = css`
        background-color: var(--powder-white);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 4px,
            rgba(0, 0, 0, 0.23) 0px 3px 4px;
        margin: 10px;
        padding: 10px;
        line-height: 16px;
        font-size: 12px;
        min-height: 120px;
        width: 250px;
        cursor: pointer;

        span {
            color: var(--pirlo-blue);
        }
    `;

    return (
        <div
            css={Mongolia}
            onClick={() => history.push(`/team/${team}`)}
            role={'presentation'}
        >
            <h3>{team}</h3>
            <div>
                {t('series')}: <span className="test">{numberOfSeries}</span>
            </div>
        </div>
    );
};

export default Card;
