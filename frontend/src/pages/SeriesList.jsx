import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { SeriesCount } from './SeriesList.styles';
import Loading from '../components/Loading';
import SeriesCard from '../components/card/SeriesCard';
import {
    CardContainer,
    CardContainerGrid,
} from '../components/card/card.styles';
import { StateContext } from '../contexts/state';

const SeriesList = ({ name }) => {
    const [t] = useTranslation(['team']);

    const [seriesList, setSeriesList] = useState();
    const { dispatch } = useContext(StateContext);

    useEffect(() => {
        const url = `/data/series/?team=${name}`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setSeriesList(json.series);
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, name]);

    return (
        <div robot_id="selectedTeam" id="selectedTeam">
            <BreadcrumbNav status={'team'} />
            {seriesList ? (
                <>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <h1>Team {name}</h1>
                        </ContentGrid6>
                    </ContainerGrid12>
                    <CardContainer>
                        <ContainerGrid12>
                            <div className="selected-team-heading">
                                <h2>
                                    {t('card.last_build.header')} {name}
                                </h2>
                                <SeriesCount>
                                    {seriesList.length}{' '}
                                    {t('card.last_build.series')}{' '}
                                </SeriesCount>
                            </div>
                            <CardContainerGrid>
                                {/* <SeriesCard
                                    data={seriesList.find(
                                        series => series.name === 'All builds'
                                    )}
                                /> */}
                                {seriesList.reverse().map((serie, i) => {
                                    return <SeriesCard key={i} data={serie} />;
                                })}
                            </CardContainerGrid>
                        </ContainerGrid12>
                    </CardContainer>
                </>
            ) : (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            )}
        </div>
    );
};

SeriesList.propTypes = {
    name: PropTypes.string.isRequired,
};

export default SeriesList;
