// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
import Table from '../components/lastRunTable/Table';
import LastRunCheckBox from '../components/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import MetadataTable from '../components/lastRunTable/MetadataTable';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import Header from '../components/header/Header';
import styled from 'styled-components';

const ParentInfoContainer = styled.div`
    display: flex;
    padding: 20px 0;
`;
const LastRunContainer = styled.div`
    position: relative;
    margin-top: 10px;
`;

const LoadingContainer = styled.div`
    min-height: 800px;
`;

const Build = () => {
    const [
        { loadingState, historyDataState, selectedBranchState, branchesState },
        dispatch,
    ] = useStateValue();
    let { buildId, seriesId } = useParams();

    const branch_id = seriesId || selectedBranchState;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (branch_id && buildId) {
                try {
                    const res = await fetch(
                        `/data/series/${branch_id}/builds/${buildId}/metadata`,
                        {}
                    );
                    const json = await res.json();
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'setMetadata',
                        metadata: json,
                    });
                } catch (error) {
                    //console.log(error);
                }
            }
        };
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
            fetchData();
        }
        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'flushHistory' });
        };
    }, [dispatch, branch_id, buildId, branchesState]);

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
                    <LoadingContainer>
                        <Loading />
                    </LoadingContainer>
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
                    <MetadataTable buildId={buildId} />
                    <LastRunCheckBox />
                    <Table id={branch_id} />
                </Fragment>
            )}
        </main>
    );
};

export default Build;
