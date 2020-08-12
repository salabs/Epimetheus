﻿import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';

const HeaderContainer = styled.div``;

const Header = () => {
    const pathname = useLocation().pathname;

    const dashboard = pathname.includes('dashboard');
    const buildUrl = pathname.includes('build');

    const [
        {
            parentData: { seriesData, buildData },
        },
    ] = useStateValue();

    const formSeriesHeader = view => {
        if (seriesData) {
            const { name } = seriesData;
            return `${view} series ${name}`;
        }
    };

    const formBuildHeader = view => {
        const { name, build_number } = buildData;
        return `${view} build ${build_number} from ${name}`;
    };

    const formHeader = buildUrl => {
        const view = dashboard ? 'Overview of ' : 'History of ';
        return buildUrl ? formBuildHeader(view) : formSeriesHeader(view);
    };

    return (
        <>
            {(seriesData || buildData) && (
                <HeaderContainer>
                    <h1>{formHeader(buildUrl)}</h1>
                    <div>Nappi</div>
                </HeaderContainer>
            )}
        </>
    );
};

export default Header;
