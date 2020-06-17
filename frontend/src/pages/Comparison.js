import React, { Fragment, useEffect } from 'react';
import Table from '../components/ComparisonTable/Table';
import ComparisonCheckbox from '../components/ComparisonTable/ComparisonCheckbox';
import { useStateValue } from '../contexts/state';
import Metadata3Table from '../components/ComparisonTable/Metadata3Table';
import { useParams } from 'react-router';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ParentBuildComparison from '../components/ComparisonTable/ParentBuildComparison';

const Build = () => {
    const buildStyles = css`
        position: relative;
        margin-top: 10px;
        .filter-container,
        .parentInfo-container {
            display: flex;
        }

        .parentInfo-container {
            padding: 20px 0;
        }
    `;
    const [
        { loadingState, historyDataState, selectedBranchState, branchesState },
        dispatch
    ] = useStateValue();
    
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
                    let json2=await res2.json();

                    json2.metadata.forEach(meta => {
                        const name = meta.metadata_name;
                        let index = 0;
                        let found = 0;
                        let metadata_len = json.metadata.length
                        while(index < metadata_len && found === 0) {
                            if(json.metadata[index].metadata_name === name){
                                found=1;
                            }else{
                                index++;
                            }
                        }
                        if(found === 0){
                            const temp = {'metadata_name': name, 'metadata_value':'', 'suite_id':'', 'test_run_id':'', 'metadata2_value':meta.metadata_value, 'suite2_id': meta.suite_id, 'test2_run_id': meta.test_run_id}
                            json.metadata.push(temp);
                        }else{
                            json.metadata[index].metadata2_value= meta.metadata_value;
                            json.metadata[index].suite2_id=meta.suite_id;
                            json.metadata[index].test2_run_id=meta.test_run_id
                        }
                    });
                    json.metadata.forEach(meta => {
                        if(!('metadata2_value' in meta)){
                            meta.metadata2_value='';
                            meta.suite2_id='';
                            meta.test2_run_id='';
                        }
                    }); 
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'setMetadata',
                        metadata: json
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

                    const jsoni = [json.history, json2.history]  

                    //What is required? Json with Fullname as "key" -> 1 status of test, 2 status of test

                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'updateCompared',
                        compareData: jsoni
                    });
                } catch (error) {}
            }
        };
        if (branchesState) {
            fetchComparisonData();
            fetchData();
        }
    }, [dispatch, seriesId, seriesId2, buildId2, buildId, branchesState]);

    return (
        <main id="last-run" css={buildStyles}>
            <div className="last-run-container"></div>
            {loadingState ? (
                <div
                    className="loading-state"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    aria-relevant="all"
                >
                    Loading
                </div>
            ) : (
                <Fragment>
                    <div
                        className="sr-show"
                        role="status"
                        aria-live="polite"
                        aria-relevant="all"
                        aria-label="Content loaded."
                    >
                        Content loaded.
                    </div>
                    <BreadcrumbNav status={'build'} />
                    <div className="parentInfo-container">
                        <ParentBuildComparison />
                    </div>
                    <Metadata3Table buildId={buildId} />
                    <ComparisonCheckbox />
                    <Table />

                </Fragment>
            )}
        </main>
    );
};

export default Build;
