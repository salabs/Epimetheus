import React, { useEffect, useState } from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import SeriesList from './SeriesList';
import TeamList from './TeamList';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';

const Team = () => {
    const [{ loadingState }, dispatch] = useStateValue();
    const [teams, setTeams] = useState();

    const { name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });

            try {
                const res = await fetch('/data/team_names/', {});
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                setTeams(json.teams);
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch]);

    console.log('teams on', teams);

    return (
        <div id="team">
            {!teams || loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : name ? (
                <SeriesList name={name} />
            ) : (
                <TeamList teams={teams} />
            )}
        </div>
    );
};
export default Team;
