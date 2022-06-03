import React, { Fragment, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../../../utils/PropTypes';
import { useTranslation } from 'react-i18next';
import SeriesTestResultTable from './seriesTestResultTable/SeriesTestResultTable';
import ParentSeries from '../../parentData/ParentSeries';
import Offset from '../../testFilters/OffSetButtons';
import LastRunCheckbox from '../../testFilters/LastRunCheckbox';
import BuildAmountSelector from '../../testFilters/BuildAmountSelector';
import { useParams } from 'react-router';
import BreadcrumbNav from '../../BreadcrumbNav';
import Loading from '../../Loading';
import { useQueryParams } from '../../../hooks/useQuery';
import { ParentContainer } from './SeriesHistory.styles';
import ContentHeader from '../../header/ContentHeader';
import { StateContext } from '../../../contexts/state';
import { ContainerGrid12, ContentGrid6 } from '../../../styles/baseComponents';
import { FilterContainer } from '../../overview/FilterContainer.styles';

const SeriesHistory = ({ currentSeries }) => {
    const [t] = useTranslation(['parentData']);

    const [seriesHistory, setSeriesHistory] = useState();
    const { state, dispatch } = useContext(StateContext);
    const { loadingState, selectedSeriesState, amountOfBuilds, offset } = state;

    const { seriesId } = useParams();
    const queryParams = useQueryParams();
    const series_id = seriesId || '1';
    const number_of_builds =
        queryParams.get('numberofbuilds') || amountOfBuilds || '30';

    const total_offset = queryParams.get('offset') || offset;

    useEffect(() => {
        const url = `/data/series/${series_id}/history?builds=${number_of_builds}&offset=${total_offset}`;
        const branch = currentSeries?.find(
            ({ id: serie_id }) => serie_id === parseInt(series_id, 10)
        );
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            dispatch({
                type: 'setAmountOfBuilds',
                amountOfBuilds: parseInt(number_of_builds),
            });
            dispatch({
                type: 'setSelectedSeries',
                name: branch?.name || ' ',
                id: series_id,
                team: branch?.team || ' ',
            });
            try {
                const res = await fetch(url, {});
                const json = await res.json();
                setSeriesHistory(json);
                dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [
        series_id,
        number_of_builds,
        offset,
        total_offset,
        currentSeries,
        dispatch,
    ]);

    return (
        <div id="history">
            <BreadcrumbNav status={'series'} />
            <ContentHeader />

            <ParentContainer id="parentInfo-container">
                <ContainerGrid12>
                    <ContentGrid6>
                        <ParentSeries currentSeries={currentSeries} />
                    </ContentGrid6>
                </ContainerGrid12>
            </ParentContainer>

            <ContainerGrid12>
                <ContentGrid6>
                    <h2>
                        {t('test_result_history')} {selectedSeriesState.name}
                    </h2>
                    <FilterContainer id="filter-container">
                        <BuildAmountSelector />
                        <Offset />
                        <LastRunCheckbox direction="row" />
                    </FilterContainer>
                    {!seriesHistory || loadingState ? (
                        <Loading />
                    ) : (
                        <Fragment>
                            <div
                                className="sr-show"
                                role="status"
                                aria-live="polite"
                                aria-relevant="all"
                                aria-label="Content loaded."
                            />
                            <SeriesTestResultTable
                                seriesHistory={seriesHistory}
                            />
                        </Fragment>
                    )}
                </ContentGrid6>
            </ContainerGrid12>
        </div>
    );
};

SeriesHistory.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default SeriesHistory;
