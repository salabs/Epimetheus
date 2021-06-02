import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TeamCard from '../components/card/TeamCard';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import {
    CardContainer,
    CardContainerGrid,
} from '../components/card/card.styles';

const TeamList = ({ teams }) => {
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
                        {teams.map((team, i) => {
                            return <TeamCard team={team} key={i} />;
                        })}
                    </CardContainerGrid>
                </ContainerGrid12>
            </CardContainer>
        </>
    );
};

TeamList.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TeamList;
