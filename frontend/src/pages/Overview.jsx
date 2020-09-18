/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Build from '../components/overview/Build';
import Series from '../components/overview/Series';
import ParentBuild from '../components/parentData/ParentBuild';
import Header from '../components/header/Header';
import { ParentInfo, FlexDiv, FlexColumn } from './Overview.styles';
import BuildAmountSelector from '../components/buttons/BuildAmountSelector';
import Offset from '../components/buttons/OffSetButtons'

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
                            <BuildAmountSelector />
                            <Offset />
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
