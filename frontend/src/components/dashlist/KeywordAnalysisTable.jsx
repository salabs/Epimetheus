import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import {
    TableContainer,
    StyledTable,
} from './KeywordAnalysisTable.styles';

const DashboardList = () => {
    const { seriesId, buildId } = useParams();
    const [
        { keywordAnalysisList },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/builds/${buildId}/keyword_analysis`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                dispatch({ type: 'setKeywordAnalysisList', data: json.statistics });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, buildId]);

    return (
        <TableContainer id="keyword-analysis-table">
            <StyledTable>
                <thead>
                    <tr>
                        <th>Library</th>
                        <th>Keyword</th>
                        <th>Total running time %</th>
                        <th>Min</th>
                        <th>Avg</th>
                        <th>Max</th>
                        <th>Total</th>
                        <th>Calls</th>
                        <th>Versions</th>
                        <th>Max call depth</th>
                    </tr>
                </thead>
                <tbody>
                    {keywordAnalysisList ? (
                        keywordAnalysisList.map(keyword => {
                            return (
                                <tr key={keyword.keyword}>
                                    <td>{keyword.library}</td>
                                    <td>{keyword.keyword}</td>
                                    <td>{keyword.percent.toFixed(2)}</td>
                                    <td>{keyword.min}</td>
                                    <td>{keyword.avg}</td>
                                    <td>{keyword.max}</td>
                                    <td>{keyword.total}</td>
                                    <td>{keyword.calls}</td>
                                    <td>{keyword.versions}</td>
                                    <td>{keyword.max_call_depth}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="10">
                                Sorry. No analysis data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};

export default DashboardList;
