import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';
import SelectedTeam from '../components/SelectedTeam';
import Loading from '../components/Loading';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';

const Team = () => {
    const TeamContainer = css`
        padding-top: 20px;
    `;

    const [t] = useTranslation(['team']);
    const [{ loadingState, teamsState }, dispatch] = useStateValue();

    const { name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });

            try {
                const res = await fetch('/data/teams', {});
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                dispatch({ type: 'setTeams', teams: json.teams });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <main id="team">
            {!teamsState || loadingState ? (
                <Loading />
            ) : name ? (
                <SelectedTeam
                    selectedTeam={teamsState.find(
                        element => element.name === name
                    )}
                />
            ) : (
                <div css={TeamContainer} id="team_container">
                    <h2>{t('title')}</h2>
                    {teamsState.map(({ name, series_count }, i) => {
                        return (
                            <Card
                                team={name}
                                numberOfSeries={series_count}
                                key={i}
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
};
export default Team;
