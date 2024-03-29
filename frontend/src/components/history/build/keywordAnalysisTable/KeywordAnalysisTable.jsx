import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Table } from '../../../table/Table';
import { StateContext } from '../../../../contexts/state';
import Loading from '../../../Loading';
import {
    ContainerGrid12,
    ContentGrid6,
} from '../../../../styles/baseComponents';
import { NarrowTh, WideTh } from '../../../table/Table.styles';

const KeywordAnalysisTable = () => {
    const [t] = useTranslation(['analysis']);
    const { seriesId, buildId } = useParams();

    const [keywordAnalysisList, setKeywordAnalysisList] = useState();
    const { state, dispatch } = useContext(StateContext);
    const { loadingState } = state;

    useEffect(() => {
        const url = `/data/series/${seriesId}/builds/${buildId}/keyword_analysis`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setKeywordAnalysisList(json.statistics);
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, buildId]);

    return (
        <Table
            robot_id="keyword-analysis-table"
            tableId="keyword-analysis-table"
        >
            <thead>
                <tr>
                    <WideTh>{t('table.library')}</WideTh>
                    <WideTh>{t('table.keyword')}</WideTh>
                    <NarrowTh>{t('table.running_time')}</NarrowTh>
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
                {loadingState ? (
                    <ContainerGrid12>
                        <ContentGrid6>
                            <Loading />
                        </ContentGrid6>
                    </ContainerGrid12>
                ) : keywordAnalysisList ? (
                    keywordAnalysisList.map(keyword => {
                        return (
                            <tr key={keyword.library + keyword.keyword}>
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
        </Table>
    );
};

export default KeywordAnalysisTable;
