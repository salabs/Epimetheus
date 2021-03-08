import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '../components/historyTable/Table';
import ParentSeries from '../components/parentData/ParentSeries';
import Offset from '../components/buttons/OffSetButtons';
import Checkbox from '../components/buttons/LastRunCheckbox';
import BuildAmountSelector from '../components/buttons/BuildAmountSelector';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Loading from '../components/Loading';
import { useQueryParams } from '../hooks/useQuery';
import { RelativeMain, ParentContainer } from './History.styles';
import ContentHeader from '../components/header/ContentHeader';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { FilterContainer } from '../components/overview/FilterContainer.styles';

const History = () => {
    const [t] = useTranslation(['parentData']);
    const [
        {
            loadingState,
            historyDataState,
            selectedBranchState,
            amountOfBuilds,
            branchesState,
            offset,
        },
        dispatch,
    ] = useStateValue();
    const { seriesId } = useParams();
    const queryParams = useQueryParams();
    const series_id = seriesId || selectedBranchState.id || '1';
    const number_of_builds =
        queryParams.get('numberofbuilds') || amountOfBuilds || '30';

    const total_offset = queryParams.get('offset') || offset;
    useEffect(() => {
        const url = `/data/series/${series_id}/history?builds=${number_of_builds}&offset=${total_offset}`;
        if (branchesState) {
            const branch = branchesState.series?.find(
                ({ id: serie_id }) => serie_id === parseInt(series_id, 10)
            );
            const fetchData = async () => {
                dispatch({ type: 'setLoadingState', loadingState: true });
                dispatch({
                    type: 'setAmountOfBuilds',
                    amountOfBuilds: parseInt(number_of_builds),
                });
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch?.name || ' ',
                    id: series_id,
                    team: branch?.team || ' ',
                });
                try {
                    const res = await fetch(url, {});
                    const json = await res.json();
                    dispatch({
                        type: 'updateHistory',
                        historyData: json,
                    });
                    dispatch({ type: 'setLoadingState', loadingState: false });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };
            fetchData();

            // returned function will be called on component unmount
            return () => {
                dispatch({ type: 'flushHistory' });
            };
        }
    }, [
        dispatch,
        series_id,
        number_of_builds,
        branchesState,
        offset,
        total_offset,
    ]);

    return (
        <RelativeMain id="history">
            <BreadcrumbNav status={'series'} />
            <ContentHeader />
            <ContainerGrid12>
                <ContentGrid6>
                    <h4>{t('title')}</h4>
                </ContentGrid6>
            </ContainerGrid12>

            <ParentContainer id="parentInfo-container">
                <ContainerGrid12>
                    <ContentGrid6>
                        <ParentSeries />
                    </ContentGrid6>
                </ContainerGrid12>
            </ParentContainer>

            <ContainerGrid12>
                <ContentGrid6>
                    <FilterContainer id="filter-container">
                        <BuildAmountSelector />
                        <Offset />
                        <Checkbox direction="row" />
                    </FilterContainer>
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
                </ContentGrid6>
            </ContainerGrid12>
        </RelativeMain>
    );
};

export default History;
