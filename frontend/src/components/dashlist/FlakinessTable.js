import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { Link } from 'react-router-dom';

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
                        value: value,
                    });
                }}
            >
                {text}
            </button>
        );
    };
    return (
        <div className="flakiness-table">
            <p>Flakiness Table</p>
            <StabilityButton value={'stable'} text="Stable" />
            <StabilityButton value={'unstable'} text="Unstable" />
            <table>
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
            </table>
        </div>
    );
};

export default DashboardList;
