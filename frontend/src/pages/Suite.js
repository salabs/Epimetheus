// eslint-disable-next-line
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import theme from '../styles/theme';
import FA from 'react-fontawesome';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Notfound from '../components/NotFound';
import { NavLink } from 'react-router-dom';
import { pickIcon } from '../components/TestIcon';
import ParentBuild from '../components/parentData/ParentBuild';
import Loading from '../components/Loading';
import styled from 'styled-components';
import Header from '../components/header/Header';
import SuiteLogMessage from '../components/SuiteLogMessage';

const ParentInfoContainer = styled.div`
    display: flex;
    padding: 20px 0;
`;

const SuiteNav = styled.div`
    list-style: none;
    padding: 0;
    align-content: center;
    border-right: 1px solid grey;
    flex-grow: 1;

    span {
        float: right;
        margin-left: 12px;
    }
    .active {
        background: #fff;
    }
`;

const SuiteDiv = styled.div`
    display: flex;
    width: 100%;
    min-width: 140px;
`;

const StyledLink = styled(NavLink)`
    width: 100%;
    padding: 10px;
    color: black !important;
    cursor: pointer;
    display: inline;
    text-decoration: none;

    :hover {
        background: #ddd;
    }
`;

const SuiteMain = styled.div`
    flex-grow: 2;
    padding: 10px;
`;

const FlexContainer = styled.div`
    display: flex;
`;

const StyledFont = styled(FA)`
    margin-right: 8px;
`;

const FlexGrowColumn = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const ListHeaderColumn = styled.ul`
    list-style: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

const ListTitle = styled.div`
    color: grey;
`;

const SelectedTestDiv = styled.div`
    background: #fff;
    margin-top: 5px;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
    }
    thead {
        color: grey;
        text-align: left;
        border-bottom: 1px solid grey;
    }
    .table-item {
        padding: 0.25rem 0rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    tr {
        border-bottom: 1px solid #eee;
    }
    .tableLogLevel {
        width: 10%;
    }
    .tableMessage {
        width: 60%;
    }
    .tableTimeStamp {
        width: 30%;
    }
`;

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

    if (selectedSuiteState) {
        console.log('Logit on', selectedSuiteState.suite.tests);
    }

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
                    <FlexContainer className="container">
                        <SuiteNav className="suiteNav">
                            {selectedSuiteState.suite.tests.map((test, i) => {
                                return (
                                    <SuiteDiv key={i}>
                                        <StyledLink
                                            to={`/series/${seriesId}/build/${buildId}/suite/${suiteId}/test/${test.id}/history`}
                                        >
                                            {pickIcon(test.status)}
                                            {test.name}
                                        </StyledLink>
                                    </SuiteDiv>
                                );
                            })}
                        </SuiteNav>
                        <SuiteMain className="suiteMain" id="suiteInfoList">
                            <div>
                                ID:{' '}
                                <span id="suiteId">
                                    {selectedSuiteState.suite.id}
                                </span>
                            </div>
                            <div>Name: {selectedSuiteState.suite.name}</div>
                            <div>
                                Fullname: {selectedSuiteState.suite.full_name}
                            </div>
                            <div>
                                Repository:{' '}
                                {selectedSuiteState.suite.repository}
                            </div>
                            <div>
                                Testrunid:{' '}
                                {selectedSuiteState.suite.test_run_id}
                            </div>
                            <div>
                                Starttime:{' '}
                                {selectedSuiteState.suite.start_time
                                    ? selectedSuiteState.suite.start_time.slice(
                                          0,
                                          16
                                      )
                                    : ''}
                            </div>
                        </SuiteMain>
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
