import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';

const TableContainer = styled.div`
    border-top: solid;
    border-color: #ddd;
    max-width: 100%;
    max-height: 100%;
    overflow-y: scroll;
    grid-area: table;
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
        { testStabilityList, stabilityChecker, amountShown },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/most_stable_tests/?limit=${amountShown}&most=${stabilityChecker}`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                dispatch({ type: 'setTestStabilityList', data: json.tests });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, stabilityChecker, amountShown]);

    const StabilityButton = ({ value, text }) => {
        return (
            <button
                onClick={() => {
                    dispatch({
                        type: 'setStabilityChecker',
                        setStability: value,
                    });
                }}
            >
                {text}
            </button>
        );
    };
    return (
        <TableContainer id="flakiness-table">
            <p>Flakiness Table</p>
            <StabilityButton value={'stable'} text="Stable" />
            <StabilityButton value={'unstable'} text="Unstable" />
            <StyledTable>
                <thead>
                    <tr>
                        <th>Test_Name</th>
                        <th>Test_Id</th>
                        <th>Flakiness</th>
                    </tr>
                </thead>
                <tbody>
                    {testStabilityList.map(test => {
                        return (
                            <tr key={test.test_id}>
                                <td>{test.test_name}</td>
                                <td>{test.test_id}</td>
                                <td>{test.instability.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default DashboardList;
