import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';

const TableContainer = styled.div`
    border-top: solid;
    border-color: #ddd;
    width: 100%;
    max-height: 400px;
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

const HighlightedButton = styled.button`
    background-color: ${props => props.color};
    color: var(--gradient-black);
    border: 1px solid var(--gradient-black);
    outline: none;
`;

const StabilityButton = ({ value, text }) => {
    const [{ stabilityChecker }, dispatch] = useStateValue();
    return (
        <HighlightedButton
            onClick={() => {
                dispatch({
                    type: 'setStabilityChecker',
                    setStability: value,
                });
            }}
            color={
                stabilityChecker === value
                    ? 'var(--evidence grey)'
                    : 'var(--nero-white)'
            }
        >
            {text}
        </HighlightedButton>
    );
};

const DashboardList = () => {
    const { seriesId } = useParams();
    const [
        { testStabilityList, stabilityChecker, amountOfBuilds, offset },
        dispatch,
    ] = useStateValue();
    console.log('testStabilityList', testStabilityList);

    useEffect(() => {
        const url = `/data/series/${seriesId}/most_stable_tests/?builds=${amountOfBuilds}&most=${stabilityChecker}&offset=${offset}`;
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
    }, [dispatch, seriesId, stabilityChecker, amountOfBuilds, offset]);

    return (
        <TableContainer id="flakiness-table">
            <StabilityButton value={'unstable'} text="Unstable" />
            <StabilityButton value={'stable'} text="Stable" />
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
