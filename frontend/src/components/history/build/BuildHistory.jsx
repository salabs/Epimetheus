import React, { Fragment, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../../../utils/PropTypes';
import BuildsTestResultTable from './buildsTestResultTable/BuildsTestResultTable';
import LastRunCheckBox from '../../testFilters/LastRunCheckbox';
import { useParams } from 'react-router';
import BreadcrumbNav from '../../BreadcrumbNav';
import ParentBuild from '../../parentData/ParentBuild';
import Loading from '../../Loading';
import BuildMetadata from '../../metadata/BuildMetadata';
import useMetadata from '../../../hooks/useMetadata';
import { ParentInfoContainer } from './BuildHistory.styles';
import ContentHeader from '../../header/ContentHeader';
import { ContainerGrid12, ContentGrid6 } from '../../../styles/baseComponents';
import { StateContext } from '../../../contexts/state';
import { FilterContainer } from '../../overview/FilterContainer.styles';

const BuildHistory = ({ currentSeries }) => {
    const [buildHistory, setBuildHistory] = useState();

    const { state, dispatch } = useContext(StateContext);
    const { loadingState, selectedSeriesState } = state;

    const { buildId, seriesId } = useParams();

    const branch_id = seriesId || selectedSeriesState;

    useEffect(() => {
        const fetchHistoryData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (branch_id && buildId) {
                const branch = currentSeries?.find(
                    ({ id: serie_id }) => serie_id === parseInt(branch_id, 10)
                );
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch?.name,
                    id: branch_id,
                    team: branch?.team || ' ',
                });
                try {
                    const res = await fetch(
                        `/data/series/${branch_id}/history?start_from=${buildId}&builds=6`,
                        {}
                    );
                    const json = await res.json();
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    setBuildHistory(json);
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            }
        };
        if (currentSeries) {
            fetchHistoryData();
        }
    }, [dispatch, branch_id, buildId, currentSeries]);

    useMetadata({ currentSeries });

    return (
        <div id="last-run">
            {!buildHistory || loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : (
                <Fragment>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    />
                    <BreadcrumbNav status={'build'} />
                    <ContentHeader />
                    <ParentInfoContainer id="parentInfo-container">
                        <ContainerGrid12>
                            <ContentGrid6>
                                <ParentBuild currentSeries={currentSeries} />
                            </ContentGrid6>
                        </ContainerGrid12>
                    </ParentInfoContainer>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <BuildMetadata />
                            <h2>Test results for build {buildId}</h2>
                            <FilterContainer>
                                <LastRunCheckBox direction="column" />
                            </FilterContainer>
                            <BuildsTestResultTable
                                id={branch_id}
                                buildHistory={buildHistory.history}
                            />
                        </ContentGrid6>
                    </ContainerGrid12>
                </Fragment>
            )}
        </div>
    );
};

BuildHistory.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default BuildHistory;
