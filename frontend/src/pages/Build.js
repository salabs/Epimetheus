// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
import Table from '../components/lastRunTable/Table';
import LastRunCheckBox from '../components/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import MetadataTable from '../components/lastRunTable/MetadataTable';
import { useParams } from 'react-router';
import { css } from '@emotion/core';
import BreadcrumbNav from '../components/BreadcrumbNav';

const Build = () => {
    const buildStyles = css`
        position: relative;
        margin-top: 10px;
        .filter-container {
            display: flex;
        }
    `;
    const [
        { loadingState, historyDataState, selectedBranchState, branchesState },
        dispatch
    ] = useStateValue();
    let { buildId } = useParams();
    //console.log(options.series);
    let { id } = useParams();
    const branch_id = id || selectedBranchState;

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
                        metadata: json
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
                    team: branch?.team || ' '
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
                        historyData: json
                    });
                } catch (error) {}
            }
        };
        if (branchesState) {
            fetchHistoryData();
            fetchData();
        }
    }, [dispatch, branch_id, buildId, branchesState]);

    return (
        <main id="last-run" css={buildStyles}>
            <div className="last-run-container"></div>
            {!historyDataState || loadingState ? (
                <div
                    className="loading-state"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    aria-relevant="all"
                >
                    Loading
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
                    <MetadataTable buildId={buildId} />
                    <LastRunCheckBox />
                    <Table id={branch_id} />
                </Fragment>
            )}
        </main>
    );
};

export default Build;
