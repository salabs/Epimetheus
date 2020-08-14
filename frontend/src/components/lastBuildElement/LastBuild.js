import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FailuresTable from './FailuresTable';
import BuildInfoTable from './BuildInfoTable';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';

const Divi = styled.div`
    border-bottom: 1px solid #ddd;
    min-width: 300px;
`;

const Containing = styled.div`
    min-width: 300px;
`;

const LastBuildElement = () => {
    const { seriesId } = useParams();
    const [failures, setFailures] = useState([]);
    const [
        {
            parentData: { seriesData, buildData },
            branchesState,
        },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        if (branchesState) {
            const branch = branchesState.series?.find(
                ({ id: serie_id }) => serie_id === parseInt(seriesId, 10)
            );
            const fetchData = async () => {
                dispatch({ type: 'setSeriesData', seriesData: branch });
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch.name || ' ',
                    id: seriesId,
                    team: branch.team || ' ',
                });
                try {
                    const { last_build } = branch;
                    const buildUrl = `/data/series/${seriesId}/builds/${last_build}/info?`;
                    const res = await fetch(buildUrl);
                    const json = await res.json();
                    const buildData = json.build;

                    dispatch({ type: 'setBuildData', buildData });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };

            const fetchHistory = async () => {
                const url = `/data/series/${seriesId}/history?builds=1`;
                try {
                    const res = await fetch(url);
                    const json = await res.json();
                    //The amount of failures of a test in test_cases is counted and made into an object. The objects are then sorted and only the selected amount are shown.
                    const filterList = json.history
                        .filter(test => test.test_cases.length !== 0)
                        .flatMap(x => x.test_cases)
                        .map(x => {
                            const failures = x.builds.filter(
                                y => y.status === 'FAIL'
                            );
                            const split_name = x.full_name.split('.');
                            return {
                                name: x.test_case,
                                id: x.test_id,
                                suite: split_name[split_name.length - 2],
                                failures: failures,
                            };
                        })
                        .filter(data => data.failures.length !== 0);
                    setFailures(filterList);
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };
            fetchData();
            fetchHistory();
        }
        return () => {
            dispatch({ type: 'flushParentData' });
        };
    }, [dispatch, seriesId, branchesState]);

    return (
        <Containing>
            <Divi>Last Build Status</Divi>
            <BuildInfoTable />
            <Divi>Failing Test Cases</Divi>
            <FailuresTable failures={failures}/>
        </Containing>
    );
};

export default LastBuildElement;
