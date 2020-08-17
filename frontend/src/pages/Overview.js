/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';

import Build from '../components/overview/Build';
import Series from '../components/overview/Series';
import ParentBuild from '../components/parentData/ParentBuild';
import Header from '../components/header/Header';
import styled from 'styled-components';
import Filter from '../components/historyTable/Filter';

const ParentInfo = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 20px 0;
`;

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const Overview = () => {
    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    return (
        <main>
            <BreadcrumbNav status={status} />
            <Header />
            <div>
                <ParentInfo id="parentInfo-container">
                    {!buildUrl ? (
                        <FlexColumn>
                            <Filter direction="row" />
                        </FlexColumn>
                    ) : (
                        <ParentBuild />
                    )}
                </ParentInfo>
                <FlexDiv>
                    {buildUrl ? (
                        <React.Fragment>
                            <Build />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Series />
                        </React.Fragment>
                    )}
                </FlexDiv>
            </div>
        </main>
    );
};

export default Overview;
