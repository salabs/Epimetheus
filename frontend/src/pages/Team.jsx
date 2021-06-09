import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import SeriesList from './SeriesList';
import TeamList from './TeamList';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { StateContext } from '../contexts/state';

const Team = () => {
    const { state, dispatch } = useContext(StateContext);
    const { loadingState, teamsState } = state;

    const { name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });

            try {
                const res = await fetch('/data/team_names/', {});
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                dispatch({
                    type: 'setTeams',
                    teams: json.teams,
                });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div id="team">
            {!teamsState || loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : name ? (
                <SeriesList name={name} />
            ) : (
                <TeamList />
            )}
        </div>
    );
};
export default Team;
