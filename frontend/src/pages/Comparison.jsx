import React, { useEffect } from 'react';
import TestComparisonTable from '../components/comparisonTable/TestComparisonTable';
import ComparisonCheckbox from '../components/comparisonTable/ComparisonCheckbox';
import { useStateValue } from '../contexts/state';
import Metadata3Table from '../components/comparisonTable/Metadata3Table';
import { useParams } from 'react-router';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ParentBuildComparison from '../components/comparisonTable/ParentBuildComparison';
import ComparisonForm from './ComparisonForm';
import Loading from '../components/Loading';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { TableContainer } from './Comparison.styles';

const Build = () => {
    const [{ loadingState }, dispatch] = useStateValue();

    let { buildId, seriesId, buildId2, seriesId2 } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (seriesId && buildId && seriesId2 && buildId2) {
                try {
                    const res = await fetch(
                        `/data/series/${seriesId}/builds/${buildId}/metadata`,
                        {}
                    );
                    let json = await res.json();

                    const res2 = await fetch(
                        `/data/series/${seriesId2}/builds/${buildId2}/metadata`,
                        {}
                    );
                    let json2 = await res2.json();

                    json2.metadata.forEach(meta => {
                        const name = meta.metadata_name;
                        let index = 0;
                        let found = 0;
                        let metadata_len = json.metadata.length;
                        while (index < metadata_len && found === 0) {
                            if (json.metadata[index].metadata_name === name) {
                                found = 1;
                            } else {
                                index++;
                            }
                        }
                        if (found === 0) {
                            const temp = {
                                metadata_name: name,
                                metadata_value: '',
                                suite_id: '',
                                test_run_id: '',
                                metadata2_value: meta.metadata_value,
                                suite2_id: meta.suite_id,
                                test2_run_id: meta.test_run_id,
                            };
                            json.metadata.push(temp);
                        } else {
                            json.metadata[index].metadata2_value =
                                meta.metadata_value;
                            json.metadata[index].suite2_id = meta.suite_id;
                            json.metadata[index].test2_run_id =
                                meta.test_run_id;
                        }
                    });
                    json.metadata.forEach(meta => {
                        if (!('metadata2_value' in meta)) {
                            meta.metadata2_value = '';
                            meta.suite2_id = '';
                            meta.test2_run_id = '';
                        }
                    });
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'setMetadata',
                        metadata: json,
                    });
                } catch (error) {
                    //console.log(error);
                }
            }
        };
        const fetchComparisonData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (seriesId && buildId && seriesId2 && buildId2) {
                try {
                    const res = await fetch(
                        `/data/series/${seriesId}/history?start_from=${buildId}&builds=1`,
                        {}
                    );
                    const json = await res.json();

                    const res2 = await fetch(
                        `/data/series/${seriesId2}/history?start_from=${buildId2}&builds=1`,
                        {}
                    );

                    const json2 = await res2.json();

                    const jsoni = [json.history, json2.history];

                    //What is required? Json with Fullname as "key" -> 1 status of test, 2 status of test

                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'updateCompared',
                        compareData: jsoni,
                    });
                } catch (error) {
                    // console.log(error);
                }
            }
        };
        if (seriesId && buildId && seriesId2 && buildId2) {
            fetchComparisonData();
            fetchData();
        }
    }, [dispatch, seriesId, seriesId2, buildId2, buildId]);

    return (
        <div id="last-run">
            {loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : seriesId && buildId && seriesId2 && buildId2 ? (
                <>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    >
                        Content loaded.
                    </div>
                    <BreadcrumbNav status={'compare'} />
                    <ContainerGrid12>
                        <ContentGrid6>
                            <h1>
                                Comparison between series {seriesId} build{' '}
                                {buildId} and series {seriesId2} build{' '}
                                {buildId2}
                            </h1>
                            <TableContainer>
                                <ParentBuildComparison />
                            </TableContainer>
                            <TableContainer>
                                <Metadata3Table buildId={buildId} />
                            </TableContainer>
                            <ComparisonCheckbox />
                            <TestComparisonTable />
                        </ContentGrid6>
                    </ContainerGrid12>
                </>
            ) : (
                <ComparisonForm />
            )}
        </div>
    );
};

export default Build;
