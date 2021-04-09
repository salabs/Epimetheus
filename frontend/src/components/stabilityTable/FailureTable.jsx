import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { useTranslation } from 'react-i18next';
import { TableContainer } from './FailureTable.styles';
import { BreakWordTd, SimpleTable, WideTh } from '../table/Table.styles';

const DashboardList = () => {
    const [t] = useTranslation(['overview']);
    const { seriesId } = useParams();

    const [{ amountOfBuilds, failureList, offset }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/history?builds=${amountOfBuilds}&offset=${offset}`;
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
                    .slice(0, amountOfBuilds);
                dispatch({ type: 'setFailureList', failures: filterList2 });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, amountOfBuilds, offset]);

    return (
        <TableContainer className="failure-table">
            <SimpleTable>
                <thead>
                    <tr>
                        <WideTh>{t('series.stability_table.test_name')}</WideTh>
                        <th>{t('series.stability_table.test_id')}</th>
                        <th>{t('series.stability_table.flakiness')}</th>
                    </tr>
                </thead>
                <tbody>
                    {failureList.map(entry => {
                        return (
                            <tr key={entry.id}>
                                <BreakWordTd>{entry.name}</BreakWordTd>
                                <td>{entry.id}</td>
                                <td>{entry.failures}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </SimpleTable>
        </TableContainer>
    );
};

export default DashboardList;
