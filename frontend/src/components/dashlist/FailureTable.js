import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';

const TableContainer = styled.div`
    border-top: solid;
    border-color: #ddd;
    max-width: 100%;
    grid-area: table;
    max-height: 100%;
    overflow-y: scroll;
`;

const StyledTable = styled.table`
    th:nth-of-type(1) {
        width: 70%;
    }
    th:nth-of-type(2) {
        width: 20%;
    }
    th:nth-of-type(3) {
        width: 10%;
    }

    th {
        border-bottom: 1px solid #ddd;
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }
    td {
        border-bottom: 1px solid #ddd;
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }
`;

const DashboardList = () => {
    const { seriesId } = useParams();

    const [
        { amountOfBuilds, failureList, amountShown },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/history?builds=${amountOfBuilds}`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                //The amount of failures of a test in test_cases is counted and made into an object. The objects are then sorted and only the selected amount are shown.
                const filterList2 = json.history
                    .filter(test => test.test_cases.length !== 0)
                    .flatMap(x => x.test_cases)
                    .map(x => {
                        const failure_count = x.builds.filter(
                            y => y.status === 'FAIL'
                        ).length;
                        return {
                            name: x.test_case,
                            id: x.test_id,
                            failures: failure_count,
                        };
                    })
                    .sort((a, b) => b.failures - a.failures)
                    .slice(0, amountShown);
                dispatch({ type: 'setFailureList', failures: filterList2 });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, amountOfBuilds, amountShown]);

    return (
        <TableContainer className="failure-table">
            <p>Failure Table</p>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Test_Name</th>
                        <th>Test_Id</th>
                        <th>Failures</th>
                    </tr>
                </thead>
                <tbody>
                    {failureList.map(entry => {
                        return (
                            <tr key={entry.id}>
                                <th>{entry.name}</th>
                                <th>{entry.id}</th>
                                <th>{entry.failures}</th>
                            </tr>
                        );
                    })}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default DashboardList;
