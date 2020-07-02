import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';

const DashboardList = () => {
    const { seriesId } = useParams();

    const [
        { amountOfBuilds, historyDataState, failureList, amountShown },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/history?builds=${amountOfBuilds}`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                const filterList2 = json.history
                    .filter(test => test.test_cases.length != 0)
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
                    });
                const filterList3 = filterList2
                    .sort((a, b) => b.failures - a.failures)
                    .slice(0, amountShown);
                dispatch({ type: 'setFailureList', failures: filterList3 });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, historyDataState, amountOfBuilds, amountShown]);

    return (
        <div className="failure-table">
            <p>Failure Table</p>
            <table>
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
            </table>
        </div>
    );
};

export default DashboardList;
