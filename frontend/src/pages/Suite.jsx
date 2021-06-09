import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Notfound from '../components/NotFound';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import SuiteMetadata from '../components/metadata/SuiteMetadata';
import TestList from '../components/suite/TestlistAccordion';
import LogMessagesTable from '../components/suite/LogMessagesTable';
import { ParentInfo } from '../styles/baseComponents';
import ContentHeader from '../components/header/ContentHeader';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { StateContext } from '../contexts/state';
import useCurrentSeries from '../hooks/useCurrentSeries';

const Suite = () => {
    const { suiteId, buildId, seriesId, testId } = useParams();

    const { state, dispatch } = useContext(StateContext);
    const { selectedSuiteState, loadingState, selectedSeriesState } = state;

    const branch_id = seriesId || selectedSeriesState;
    const currentSeries = useCurrentSeries();

    useEffect(() => {
        const fetchHistoryData = async () => {
            if (branch_id && buildId) {
                const branch = currentSeries?.find(
                    ({ id: serie_id }) => serie_id === parseInt(branch_id, 10)
                );
                dispatch({
                    type: 'setSelectedSeries',
                    name: branch?.name,
                    id: seriesId,
                    team: branch?.team || ' ',
                });
            }
        };
        const fetchSuiteData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(
                    `/data/series/${seriesId}/builds/${buildId}/suites/${suiteId}/?`,
                    {}
                );
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                dispatch({ type: 'setSelectedSuiteState', suite: json });
            } catch (error) {
                //console.log(error);
            }
        };
        if (currentSeries) {
            fetchHistoryData();
            fetchSuiteData();
        }

        return () => {
            dispatch({ type: 'flushSuiteState' });
        };
    }, [dispatch, branch_id, suiteId, buildId, seriesId, currentSeries]);

    return (
        <div id="suite">
            {!selectedSuiteState || loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : selectedSuiteState.suite ? (
                <div>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    />
                    <BreadcrumbNav status={'suite'} />
                    <ContentHeader />
                    <ParentInfo className="parentInfo-container">
                        <ContainerGrid12>
                            <ContentGrid6>
                                <ParentBuild currentSeries={currentSeries} />
                            </ContentGrid6>
                        </ContainerGrid12>
                    </ParentInfo>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <SuiteMetadata />
                        </ContentGrid6>
                    </ContainerGrid12>
                    <ContainerGrid12>
                        <TestList suite={selectedSuiteState.suite} />
                    </ContainerGrid12>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <LogMessagesTable
                                test={selectedSuiteState.suite.tests.find(
                                    i => i.id === parseInt(testId, 10)
                                )}
                            />
                        </ContentGrid6>
                    </ContainerGrid12>
                </div>
            ) : (
                <Notfound />
            )}
        </div>
    );
};

export default Suite;
