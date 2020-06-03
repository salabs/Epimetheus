// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Filter from '../components/historyTable/Filter';
import Table from '../components/historyTable/Table';
import ParentSeries from '../components/parentData/ParentSeries';
import Checkbox from '../components/Checkbox';
import { useStateValue } from '../contexts/state';
// import BranchFilter from '../components/BranchFilter';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Loading from '../components/Loading';
import { useQueryParams } from '../hooks/useQuery';

const History = () => {
    const filterStyles = css`
        position: relative;

        .filter-container,
        .parentInfo-container {
            display: flex;
            flex-flow: row wrap;
        }

        .filter-container {
            max-width: 800px;
        }

        .parentInfo-container {
            padding: 20px 0;
        }
    `;
    const [
        {
            loadingState,
            historyDataState,
            selectedBranchState,
            amountOfBuilds,
            branchesState
        },
        dispatch
    ] = useStateValue();
    const { seriesId } = useParams();
    const queryParams = useQueryParams();
    const series_id = seriesId || selectedBranchState.id || '1';
    const number_of_builds =
        queryParams.get('numberofbuilds') || amountOfBuilds || '30';

    useEffect(() => {
        const url = `/data/series/${series_id}/history?builds=${number_of_builds}`;
        if (branchesState) {
            const branch = branchesState.series?.find(
                ({ id: serie_id }) => serie_id === parseInt(series_id, 10)
            );
            const fetchData = async () => {
                dispatch({ type: 'setLoadingState', loadingState: true });
                dispatch({
                    type: 'setAmountOfBuilds',
                    amountOfBuilds: number_of_builds
                });
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch?.name || ' ',
                    id: series_id,
                    team: branch?.team || ' '
                });
                try {
                    const res = await fetch(url, {});
                    const json = await res.json();
                    dispatch({
                        type: 'updateHistory',
                        historyData: json
                    });
                    dispatch({ type: 'setLoadingState', loadingState: false });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };
            fetchData();
        }
    }, [dispatch, series_id, number_of_builds, branchesState]);

    return (
        <main id="history" css={filterStyles}>
            <BreadcrumbNav status={'series'} />
            {!loadingState && (
                <div className="parentInfo-container">
                    <ParentSeries />
                </div>
            )}
            <div className="filter-container">
                <Filter />
                <Checkbox />
            </div>
            {!historyDataState || loadingState ? (
                <Loading />
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
                    <Table />
                </Fragment>
            )}
        </main>
    );
};

export default History;
