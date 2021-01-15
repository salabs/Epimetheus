import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import Card from '../components/team/Card';
import { useParams } from 'react-router';
import SelectedTeam from '../components/team/SelectedTeam';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { TeamHeader, TeamContainer } from './Team.styles';

const Team = () => {
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
        <div id="team">
            {!teamsState || loadingState ? (
                <Loading />
            ) : name ? (
                <SelectedTeam
                    selectedTeam={teamsState.find(
                        element => element.name === name
                    )}
                />
            ) : (
                <>
                    <TeamHeader>{t('title')}</TeamHeader>
                    <TeamContainer>
                        {teamsState.map(({ name, series_count }, i) => {
                            return (
                                <Card
                                    team={name}
                                    numberOfSeries={series_count}
                                    key={i}
                                />
                            );
                        })}
                    </TeamContainer>
                </>
            )}
        </div>
    );
};
export default Team;
