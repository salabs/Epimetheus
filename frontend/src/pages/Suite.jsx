// eslint-disable-next-line
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import theme from '../styles/theme';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Notfound from '../components/NotFound';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import SuiteMetadata from '../components/metadata/SuiteMetadata';
import TestList from '../components/suite/Testlist';
import LogMessages from '../components/suite/LogMessages';
import { ParentInfoContainer } from './Suite.styles';
import ContentHeader from '../components/header/ContentHeader';

const Suite = () => {
    const { suiteId, buildId, seriesId, testId } = useParams();
    const [
        {
            selectedSuiteState,
            loadingState,
            branchesState,
            selectedBranchState,
        },
        dispatch,
    ] = useStateValue();

    const branch_id = seriesId || selectedBranchState;

    useEffect(() => {
        const fetchHistoryData = async () => {
            if (branch_id && buildId) {
                const branch = branchesState.series?.find(
                    ({ id: serie_id }) => serie_id === parseInt(branch_id, 10)
                );
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch?.name,
                    id: seriesId,
                    team: branch?.team || ' ',
                });
                dispatch({ type: 'setSelectedBuild', selectedBuild: buildId });
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
        if (branchesState) {
            fetchHistoryData();
            fetchSuiteData();
        }

        return () => {
            dispatch({ type: 'flushSuiteState' });
        };
    }, [dispatch, branch_id, suiteId, buildId, seriesId, branchesState]);

    return (
        <div id="suite">
            {!selectedSuiteState || loadingState ? (
                <div
                    css={theme.loadingState}
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    aria-relevant="all"
                >
                    <Loading />
                </div>
            ) : selectedSuiteState.suite ? (
                <div>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    >
                        Content loaded.
                    </div>
                    <BreadcrumbNav status={'suite'} />
                    <ContentHeader />
                    <ParentInfoContainer className="parentInfo-container">
                        <ParentBuild />
                    </ParentInfoContainer>
                    <SuiteMetadata />
                    <TestList suite={selectedSuiteState.suite} />
                    <LogMessages
                        test={selectedSuiteState.suite.tests.find(
                            i => i.id === parseInt(testId, 10)
                        )}
                    />
                </div>
            ) : (
                <Notfound />
            )}
        </div>
    );
};

export default Suite;
