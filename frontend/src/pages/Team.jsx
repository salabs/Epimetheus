import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import SeriesList from './SeriesList';
import TeamList from './TeamList';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';

const Team = () => {
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
        <div robot_id="team" id="team">
            {!teamsState || loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : name ? (
                <SeriesList
                    selectedTeam={teamsState.find(
                        element => element.name === name
                    )}
                />
            ) : (
                <TeamList teamsState={teamsState} />
            )}
        </div>
    );
};
export default Team;
