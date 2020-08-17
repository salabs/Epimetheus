/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FailuresTable from './FailuresTable';
import BuildInfoTable from './BuildInfoTable';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';

const Divi = styled.div`
    border-bottom: 1px solid #ddd;
    min-width: 300px;
    font-weight: bold;
`;

const Containing = styled.div`
    min-width: 300px;
`;

const LastBuildElement = () => {
    const { seriesId } = useParams();
    const [failures, setFailures] = useState([]);
    const [dispatch] = useStateValue();

    useEffect(() => {
        let mounted = true;
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
                if (mounted) {
                    setFailures(filterList);
                }
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchHistory();

        return () => (mounted = false);
    }, [seriesId]);

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
