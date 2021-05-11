import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useStateValue } from '../contexts/state';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { SeriesCount } from './SeriesList.styles';
import NotFound from '../components/NotFound';
import PropTypes from 'prop-types';
import SeriesCard from '../components/card/SeriesCard';
import {
    CardContainer,
    CardContainerGrid,
} from '../components/card/card.styles';

const SeriesList = ({ selectedTeam }) => {
    const [t] = useTranslation(['team']);
    let location = useLocation();
    const teamName = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    );

    const [{ teamsState }] = useStateValue();
    const seriesCount = teamsState.find(team => team.name.includes(teamName))
        .series_count;

    return (
        <div robot_id="selectedTeam" id="selectedTeam">
            <BreadcrumbNav status={'team'} />
            {selectedTeam && selectedTeam.all_builds ? (
                <>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <h1>Team {teamName}</h1>
                        </ContentGrid6>
                    </ContainerGrid12>
                    <CardContainer>
                        <ContainerGrid12>
                            <div className="selected-team-heading">
                                <h2>
                                    {t('card.last_build.header')} {teamName}
                                </h2>
                                <SeriesCount>
                                    {seriesCount} {t('card.last_build.series')}{' '}
                                </SeriesCount>
                            </div>
                            <CardContainerGrid>
                                <SeriesCard data={selectedTeam.all_builds} />
                                {selectedTeam.series
                                    .reverse()
                                    .map((serie, i) => {
                                        return (
                                            <SeriesCard key={i} data={serie} />
                                        );
                                    })}
                            </CardContainerGrid>
                        </ContainerGrid12>
                    </CardContainer>
                </>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

SeriesList.propTypes = {
    selectedTeam: PropTypes.shape({
        all_builds: PropTypes.object,
        name: PropTypes.string,
        series: PropTypes.array,
        series_count: PropTypes.number,
    }),
};

export default SeriesList;
