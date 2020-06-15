import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import { useHistory } from 'react-router-dom';
import theme from '../styles/theme';
import BreadcrumbNav from './BreadcrumbNav';
import { pickIcon } from './TestIcon';
import { useTranslation } from 'react-i18next';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const SelectedTeam = ({ selectedTeam }) => {
    const [t] = useTranslation(['team']);

    const cardStyles = css`
        background-color: var(--nero-white);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 4px,
            rgba(0, 0, 0, 0.23) 0px 3px 4px;
        margin: 10px;
        padding: 10px;
        line-height: 16px;

        .series:hover,
        .builds:hover {
            cursor: pointer;
        }

        h3,
        h4 {
            font-size: 16px;
            line-height: 20px;
        }
        h3 {
            margin-top: 0;
        }
        .cardInfoContainer:hover {
            background-color: var(--hermanni-grey);
        }

        .cardValue {
            color: var(--pirlo-blue);
        }

        @media only screen and (min-width: 1024px) {
            .card {
                min-width: 440px;
                min-height: 220px;
            }
        }
    `;

    let history = useHistory();

    const flexContainer = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '20px',
    };

    const TeamCard = ({ data }) => {
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
            <div css={cardStyles}>
                <div>
                    <h3>{name}</h3>
                </div>
                <div className="card">
                    <div
                        className="series"
                        onClick={() => history.push(`/series/${id}/history`)}
                        role={'presentation'}
                    >
                        <h4>{t('card.series.title')}</h4>
                        <div className="cardInfoContainer">
                            {t('card.series.builds')}:{' '}
                            <span className="cardValue">{builds}</span>
                        </div>
                    </div>
                    <div
                        className="builds"
                        onClick={() =>
                            history.push(
                                `/series/${id}/build/${last_build}/history`
                            )
                        }
                        role={'presentation'}
                    >
                        <h4>{t('card.last_build.title')}</h4>
                        <div className="cardInfoContainer">
                            {t('card.last_build.build_number')}:{' '}
                            <span className="cardValue">{last_build}</span>
                        </div>
                        <div className="cardInfoContainer">
                            {t('card.last_build.build_id')}:{' '}
                            <span className="cardValue">{last_build_id}</span>
                        </div>
                        <div className="cardInfoContainer">
                            {t('card.last_build.last_build_started')}:{' '}
                            <span className="cardValue">{LastStarted}</span>
                        </div>
                        <div className="cardInfoContainer">
                            {t('card.last_build.last_status')}:{' '}
                            <span className="cardValue">{testStatusIcon}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main id="selectedTeam" css={theme.loadingState}>
            <BreadcrumbNav status={'team'} />
            {selectedTeam && selectedTeam.all_builds ? (
                <div style={flexContainer}>
                    <TeamCard data={selectedTeam.all_builds} />
                    {selectedTeam.series.reverse().map((serie, i) => {
                        return <TeamCard key={i} data={serie} />;
                    })}
                </div>
            ) : (
                <NotFound />
            )}
        </main>
    );
};

SelectedTeam.propTypes = {
    selectedTeam: PropTypes.shape({
        all_builds: PropTypes.object,
        name: PropTypes.string,
        series: PropTypes.array,
        series_count: PropTypes.number,
    }),
};

export default SelectedTeam;
