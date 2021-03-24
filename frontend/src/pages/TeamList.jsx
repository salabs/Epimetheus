import React from 'react';
import { useTranslation } from 'react-i18next';
import TeamCard from '../components/card/TeamCard';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import {
    CardContainer,
    CardContainerGrid,
} from '../components/card/card.styles';

const TeamList = ({ teamsState }) => {
    const [t] = useTranslation(['team']);

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
    );
};

export default TeamList;
