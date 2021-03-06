import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { useTranslation } from 'react-i18next';
import { StyledTable } from './KeywordAnalysisTable.styles';
import { OverflowWrapper, TableWrapper } from '../historyTable/Table.styles';

const DashboardList = () => {
    const [t] = useTranslation(['analysis']);
    const { seriesId, buildId } = useParams();
    const [{ keywordAnalysisList }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/builds/${buildId}/keyword_analysis`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                dispatch({
                    type: 'setKeywordAnalysisList',
                    data: json.statistics,
                });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, buildId]);

    return (
        <TableWrapper>
            <OverflowWrapper>
                <StyledTable id="keyword-analysis-table">
                    <thead>
                        <tr>
                            <th>{t('table.library')}</th>
                            <th>{t('table.keyword')}</th>
                            <th>{t('table.running_time')}</th>
                            <th>{t('table.min')}</th>
                            <th>{t('table.avg')}</th>
                            <th>{t('table.max')}</th>
                            <th>{t('table.total')}</th>
                            <th>{t('table.calls')}</th>
                            <th>{t('table.versions')}</th>
                            <th>{t('table.call_depth')}</th>
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
                                <td colSpan="10">{t('table.no_data')}</td>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
            </OverflowWrapper>
        </TableWrapper>
    );
};

export default DashboardList;
