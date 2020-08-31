// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
import Table from '../components/lastRunTable/Table';
import LastRunCheckBox from '../components/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import Metadata from '../components/lastRunTable/Metadata';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import Header from '../components/header/Header';
import useMetaData from '../hooks/useMetaData';
import { ParentInfoContainer, LastRunContainer } from './Build.styles';

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

    useMetaData();

    return (
        <main id="last-run">
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
                    <Header />
                    <ParentInfoContainer id="parentInfo-container">
                        <ParentBuild />
                    </ParentInfoContainer>
                    <Metadata />
                    <LastRunCheckBox />
                    <Table id={branch_id} />
                </Fragment>
            )}
        </main>
    );
};

export default Build;
