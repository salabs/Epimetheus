import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import TeamCard from '../components/card/TeamCard';
import { useParams } from 'react-router';
import SeriesList from './SeriesList';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import {
    CardContainer,
    CardContainerGrid,
} from '../components/card/card.styles';

const TeamList = () => {
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
                <>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <h1>{t('title')}</h1>
                        </ContentGrid6>
                    </ContainerGrid12>
                    <CardContainer>
                        <ContainerGrid12>
                            <CardContainerGrid>
                                {teamsState.map(({ name, series_count }, i) => {
                                    return (
                                        <TeamCard
                                            team={name}
                                            numberOfSeries={series_count}
                                            key={i}
                                        />
                                    );
                                })}
                            </CardContainerGrid>
                        </ContainerGrid12>
                    </CardContainer>
                </>
            )}
        </div>
    );
};
export default TeamList;
