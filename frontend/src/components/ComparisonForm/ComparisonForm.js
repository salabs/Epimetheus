// eslint-disable-next-line
import React,{ useState, useEffect, Fragment } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

const ComparisonForm = () =>{
    let history = useHistory();
    const [seriesList, setSeriesList] = useState([]);
    const [buildList, setBuildList] = useState([]);
    const [buildList2, setBuildList2] = useState([]);
    const [series, setSeries] = useState();
    const [build, setBuild] = useState();

    const [series2, setSeries2] = useState();
    const [build2, setBuild2] = useState();
    const [loadingState, setLoadingState] = useState(false);
    const [seriesLoading, setSeriesLoading] = useState(true);

    const buildStyles = css`
        position: relative;
        margin-top: 10px;
        .input-container {
            display: inline-block;
           
            padding: 20px
        }
        .input-container div {
            padding: 10px
        }

        
    `;
    
    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            setLoadingState(true)
            try {
                const res =  await fetch('/data/series', {});
                const json =  await res.json();
                if(!isCancelled){
                    setLoadingState(false)
                    setSeriesLoading(false)
                    setSeriesList(json.series);
                }
                
            } catch (error) {
                console.log(error)
            }
        };

        const fetchBuildData = async () => {
            setLoadingState(true)
            try {
                const res =  await fetch(`/data/series/${series}/builds/`, {});
                const json =  await res.json();
                if(!isCancelled){
                    setLoadingState(false)
                    setBuildList(json.builds);
                }
            } catch (error) {
                console.log(error)
            }
        };
        const fetchBuildData2 = async () => {
            setLoadingState(true)
            try {
                const res =  await fetch(`/data/series/${series2}/builds/`, {});
                const json =  await res.json();
                if(!isCancelled){
                    setLoadingState(false)
                    setBuildList2(json.builds);
                }
            } catch (error) {
                console.log(error)
            }
        };

        if(!series){
            fetchData();
        }
        if(!seriesLoading){
            if(series){
                fetchBuildData();
            }
            if(series2){
                fetchBuildData2();
            }
            
        }
        return() => {
            isCancelled = true;
        }
    }, [series, series2, build, build2]);

   

    return(
        <div className="form-container" css={buildStyles}>
            {loadingState ? (
                <div>Please Wait</div>
            ) : (
            <form onSubmit={() => history.push(`/compare/${series}/${build}/to/${series2}/${build2}`)}>
                <div className="input-container" id="first-input-container">
                    <div id="first-series-container">
                        <h4>Series1</h4>
                        <select defaultValue={'Default'} value={series} onChange={e => setSeries(e.target.value)} >
                        <option value="Default" disabled>Please select Series</option>
                            {seriesList.map(series => {
                                return (
                                <option key={series.id} value={series.id}>{series.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div id="first-build-container"> 
                        <h4>Build1</h4>
                        <select defaultValue={'Default'} value={build} onChange={e => setBuild(e.target.value)} >
                            <option value="Default" disabled>Please select Build after Series</option>
                            {buildList.map(build => {
                                return (
                                <option key={build.build_number} value={build.build_number}>{build.build_number}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="input-container" id="second-input-container">
                    <div id="second-series-container">
                        <h4>Series2</h4>
                        <select defaultValue={'Default'} value={series2} onChange={e => setSeries2(e.target.value)}>
                            <option value="Default" disabled>Please select Series</option>
                            {seriesList.map(series => {
                                return (
                                <option key={series.id} value={series.id}>{series.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div id="second-build-container"> 
                        <h4>Build2</h4>
                        <select defaultValue={'Default'} value={build2} onChange={e => setBuild2(e.target.value)} >
                        <option value="Default" disabled>Please select Build after Series</option>
                            {buildList2.map(build => {
                                return (
                                <option key={build.build_number} value={build.build_number}>{build.build_number}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>           
                <input type="submit" value="Compare" />
            </form>
            )}
        </div>
    )
}

export default ComparisonForm