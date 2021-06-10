import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import TeamCard from '../components/card/TeamCard';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import {
    CardContainer,
    CardContainerGrid,
} from '../components/card/card.styles';
import { StateContext } from '../contexts/state';

const TeamList = () => {
    const [t] = useTranslation(['team']);

    const { state } = useContext(StateContext);
    const { teamsState } = state;

    return (
        <>
            <ContainerGrid12>
                <ContentGrid6>
                    <h1>{t('title')}</h1>
                </ContentGrid6>
            </ContainerGrid12>
            <CardContainer>
                <ContainerGrid12>
                    <CardContainerGrid teamsList={true}>
                        {teamsState.map((team, i) => {
                            return <TeamCard team={team} key={i} />;
                        })}
                    </CardContainerGrid>
                </ContainerGrid12>
            </CardContainer>
        </>
    );
};

export default TeamList;
