import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';
import SelectedTeam from '../components/team/SelectedTeam';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const TeamHeader = styled.h2`
    padding: 24px 0px 24px 198px;

    @media only screen and (max-width: 1280px) {
        padding: 12px 0 12px 108px;
    }
`;

const TeamContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 40px 108px;
    background: var(--hermanni-grey-lighter);
`;

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
        </main>
    );
};
export default Team;
