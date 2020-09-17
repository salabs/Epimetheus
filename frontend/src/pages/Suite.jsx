// eslint-disable-next-line
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import theme from '../styles/theme';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Notfound from '../components/NotFound';
import { pickIcon } from '../components/TestIcon';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import Header from '../components/header/Header';
import SuiteLogMessage from '../components/SuiteLogMessage';
import SuiteMetadata from '../components/metadata/SuiteMetadata';
import {
    ParentInfoContainer,
    SuiteNav,
    SuiteDiv,
    StyledLink,
    FlexContainer,
    StyledFont,
    FlexGrowColumn,
    ListHeaderColumn,
    ListTitle,
    SelectedTestDiv,
} from './Suite.styles';

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
        <main id="suite">
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
                    <Header />
                    <ParentInfoContainer className="parentInfo-container">
                        <ParentBuild />
                    </ParentInfoContainer>
                    <SuiteMetadata />
                    <FlexContainer className="container">
                        <SuiteNav className="suiteNav" id="suiteId">
                            {selectedSuiteState.suite.tests.map((test, i) => {
                                return (
                                    <SuiteDiv key={i}>
                                        <StyledLink
                                            to={`/series/${seriesId}/build/${buildId}/suite/${suiteId}/test/${test.id}/history`}
                                        >
                                            {test.name}
                                            <span>{pickIcon(test.status)}</span>
                                        </StyledLink>
                                    </SuiteDiv>
                                );
                            })}
                        </SuiteNav>
                    </FlexContainer>
                    <SelectedTest
                        test={selectedSuiteState.suite.tests.find(
                            i => i.id === parseInt(testId, 10)
                        )}
                    />
                </div>
            ) : (
                <Notfound />
            )}
        </main>
    );
};

const SelectedTest = ({ test }) => {
    return test ? (
        <div>
            <SelectedTestDiv>
                <FlexGrowColumn className="flex-grow flex-column">
                    <ListTitle className="list-title">
                        <StyledFont name="desktop" />
                        Name
                    </ListTitle>
                    <ListHeaderColumn className="flex-column list-header">
                        <li>
                            <StyledFont name="info" />
                            {test.name}
                        </li>
                    </ListHeaderColumn>
                </FlexGrowColumn>
                <FlexGrowColumn className="flex-grow flex-column">
                    <ListTitle className="list-title">
                        <StyledFont name="tags" />
                        Tags
                    </ListTitle>
                    <ListHeaderColumn className="flex-column list-header">
                        {test.tags.map((tag, i) => {
                            return <li key={i}>{tag}</li>;
                        })}
                    </ListHeaderColumn>
                </FlexGrowColumn>
                <FlexGrowColumn className="flex-grow flex-column">
                    <ListTitle className="list-title">
                        <StyledFont name="tachometer" />
                        Statuses
                    </ListTitle>
                    <ListHeaderColumn className="flex-column list-header">
                        <li>Setup: {test.setup_status}</li>
                        <li>Execution: {test.execution_status}</li>
                        <li>Teardown: {test.teardown_status}</li>
                    </ListHeaderColumn>
                </FlexGrowColumn>
            </SelectedTestDiv>
            <SelectedTestDiv>
                <FlexGrowColumn className="flex-grow flex-column">
                    <ListTitle className="list-title">
                        <StyledFont name="comment" />
                        Log messages
                    </ListTitle>
                    <table id="logMessages-table">
                        <thead>
                            <tr>
                                <th className="tableLogLevel">Log level</th>
                                <th className="tableMessage">Message</th>
                                <th className="tableTimeStamp">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {test.log_messages !== null &&
                                test.log_messages.map(
                                    ({ log_level, message, timestamp }, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div
                                                        className="table-item"
                                                        title={log_level}
                                                    >
                                                        {log_level}
                                                    </div>
                                                </td>
                                                <td>
                                                    <SuiteLogMessage
                                                        message={message}
                                                    />
                                                </td>
                                                <td>
                                                    <div
                                                        className="table-item"
                                                        title={timestamp}
                                                    >
                                                        {pickIcon('TIME')}
                                                        {timestamp}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                        </tbody>
                    </table>
                </FlexGrowColumn>
            </SelectedTestDiv>
        </div>
    ) : null;
};

export default Suite;
