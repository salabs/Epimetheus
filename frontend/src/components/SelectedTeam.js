import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import { useHistory } from 'react-router-dom';
import theme from '../styles/theme';
import BreadcrumbNav from './BreadcrumbNav';
import { pickIcon } from './TestIcon';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const SelectedTeam = ({ selectedTeam }) => {
    const cardStyles = css`
        background-color: #fafafa;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 4px,
            rgba(0, 0, 0, 0.23) 0px 3px 4px;
        margin: 10px;
        padding: 10px;

        .series:hover,
        .builds:hover {
            cursor: pointer;
        }
    `;

    let history = useHistory();

    const flexContainer = {
        display: 'flex',
        flexWrap: 'wrap'
    };

    const TeamCard = ({ serie }) => {
        const {
            id,
            name,
            builds,
            last_build,
            last_build_id,
            last_started,
            last_status
        } = serie;

        const LastStarted = last_started.slice(0, 16);
        const testStatusIcon = pickIcon(last_status);

        return (
            <div css={cardStyles}>
                <div>
                    <h3>{name}</h3>
                </div>
                <hr />
                <div>
                    <div
                        className="series"
                        onClick={() => history.push(`/history/${id}/10`)}
                        role={'presentation'}
                    >
                        <h4>Series</h4>
                        Number of builds: {builds}
                    </div>
                    <hr />
                    <div
                        className="builds"
                        onClick={() => history.push(`/history/${id}/10`)}
                        role={'presentation'}
                    >
                        <h4>Last build</h4>
                        Build number: {last_build}
                        <br />
                        Build id: {last_build_id}
                        <br />
                        Last build started: {LastStarted}
                        <br />
                        Last status: {testStatusIcon}
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
                    {/* <div
                        style={theme.flexItem}
                        onClick={() =>
                            history.push(
                                `/history/${selectedTeam.all_builds.id}/10`
                            )
                        }
                        role={'presentation'}
                    >
                        <h3>{selectedTeam.all_builds.name}</h3>
                        <hr />
                        <div style={cardItem}>
                            <div>
                                <FA name="clock-o" />{' '}
                                {selectedTeam.all_builds.last_started.slice(
                                    0,
                                    16
                                )}
                            </div>
                            <div>
                                <FA name="hashtag" />{' '}
                                {selectedTeam.all_builds.last_build}
                            </div>
                        </div>
                    </div> */}
                    <TeamCard serie={selectedTeam.all_builds} />
                    {selectedTeam.series.reverse().map((serie, i) => {
                        return (
                            // <div
                            //     style={theme.flexItem}
                            //     key={i}
                            //     onClick={() =>
                            //         history.push(`/history/${element.id}/10`)
                            //     }
                            //     role={'presentation'}
                            // >
                            //     <h3>{element.name}</h3>
                            //     <hr />
                            //     <div style={cardItem}>
                            //         <div>
                            //             <FA name="clock-o" />{' '}
                            //             {element.last_started.slice(0, 16)}
                            //         </div>
                            //         <div>
                            //             <FA name="hashtag" />{' '}
                            //             {element.last_build}
                            //         </div>
                            //     </div>
                            // </div>
                            <TeamCard key={i} serie={serie} />
                        );
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
