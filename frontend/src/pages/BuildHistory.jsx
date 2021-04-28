import React, { Fragment, useEffect, useState } from 'react';
import BuildsTestResultTable from '../components/buildsTestResultTable/BuildsTestResultTable';
import LastRunCheckBox from '../components/testFilters/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import BuildMetadata from '../components/metadata/BuildMetadata';
import useMetadata from '../hooks/useMetadata';
import { ParentInfoContainer } from './BuildHistory.styles';
import ContentHeader from '../components/header/ContentHeader';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { FilterContainer } from '../components/overview/FilterContainer.styles';

const BuildHistory = () => {
    const [buildHistory, setBuildHistory] = useState(null);
    const [
        { loadingState, selectedBranchState, branchesState },
        dispatch,
    ] = useStateValue();
    let { buildId, seriesId } = useParams();

    const branch_id = seriesId || selectedBranchState;

    useEffect(() => {
        const fetchHistoryData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (branch_id && buildId) {
                const branch = branchesState.series?.find(
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
                        `/data/series/${branch_id}/history?start_from=${buildId}&builds=5`,
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
        if (branchesState) {
            fetchHistoryData();
        }
    }, [dispatch, branch_id, buildId, branchesState]);

    useMetadata();

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
                                <ParentBuild />
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
                                buildHistory={buildHistory}
                            />
                        </ContentGrid6>
                    </ContainerGrid12>
                </Fragment>
            )}
        </div>
    );
};

export default BuildHistory;
