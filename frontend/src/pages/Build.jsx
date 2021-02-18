// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
import Table from '../components/buildTable/Table';
import LastRunCheckBox from '../components/buttons/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import BuildMetadata from '../components/metadata/BuildMetadata';
import useMetadata from '../hooks/useMetadata';
import {
    ParentInfoContainer,
    LastRunContainer,
} from './Build.styles';
import ContentHeader from '../components/header/ContentHeader';

const Build = () => {
    const [
        { loadingState, historyDataState, selectedBranchState, branchesState },
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
                dispatch({ type: 'setSelectedBuild', selectedBuild: buildId });
                try {
                    const res = await fetch(
                        `/data/series/${branch_id}/history?start_from=${buildId}&builds=5`,
                        {}
                    );
                    const json = await res.json();
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'updateHistory',
                        historyData: json,
                    });
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
            <LastRunContainer id="last-run-container"></LastRunContainer>
            {!historyDataState || loadingState ? (
                <div
                    className="loading-state"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    aria-relevant="all"
                >
                    <Loading />
                </div>
            ) : (
                <Fragment>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    >
                        Content loaded.
                    </div>
                    <BreadcrumbNav status={'build'} />
                    <ContentHeader />
                    <ParentInfoContainer id="parentInfo-container">
                        <ParentBuild />
                    </ParentInfoContainer>
                    <BuildMetadata />
                    <h2>Test results for build {buildId}</h2>
                    <LastRunCheckBox direction="column" />
                    <Table id={branch_id} />
                </Fragment>
            )}
        </div>
    );
};

export default Build;
