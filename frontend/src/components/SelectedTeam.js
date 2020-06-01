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
        background-color: #fafafa;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 4px,
            rgba(0, 0, 0, 0.23) 0px 3px 4px;
        margin: 10px;
        padding: 10px;

        h3 {
            line-height: 0;
        }

        .series:hover,
        .builds:hover {
            cursor: pointer;
        }
        .cardInfo {
            padding: 5px 0px;
        }
    `;

    let history = useHistory();

    const flexContainer = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '20px'
    };

    const TeamCard = ({ data }) => {
        const {
            id,
            name,
            builds,
            last_build,
            last_build_id,
            last_started,
            last_status
        } = data;

        const LastStarted = last_started.slice(0, 16);
        const testStatusIcon = pickIcon(last_status);

        return (
            <div css={cardStyles}>
                <div>
                    <h2>{name}</h2>
                </div>
                <hr />
                <div>
                    <div
                        className="series"
                        onClick={() => history.push(`/series/${id}/history`)}
                        role={'presentation'}
                    >
                        <h3>{t('card.series.title')}</h3>
                        <div className="cardInfo">
                            {t('card.series.builds')}: {builds}
                        </div>
                    </div>
                    <hr />
                    <div
                        className="builds"
                        onClick={() =>
                            history.push(
                                `/series/${id}/build/${last_build}/history`
                            )
                        }
                        role={'presentation'}
                    >
                        <h3>{t('card.last_build.title')}</h3>
                        <div className="cardInfo">
                            {t('card.last_build.build_number')}: {last_build}{' '}
                        </div>
                        {/* <br /> */}
                        <div className="cardInfo">
                            {t('card.last_build.build_id')}: {last_build_id}
                        </div>
                        {/* <br /> */}
                        <div className="cardInfo">
                            {t('card.last_build.last_build_started')}:{' '}
                            {LastStarted}
                        </div>
                        {/* <br /> */}
                        <div className="cardInfo">
                            {t('card.last_build.last_status')}: {testStatusIcon}
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
        series_count: PropTypes.number
    })
};

export default SelectedTeam;
