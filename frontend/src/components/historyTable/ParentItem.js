import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../../contexts/state';

import ThemeContext from '../../contexts/themeContext';

const ParentItem = () => {
    const theme = useContext(ThemeContext);

    const tableStyles = css`
        ${theme.baseTableStyle}

        table {
            border-collapse: collapse;
            table-layout: fixed;
            overflow: auto;
        }

        td,
        th {
            vertical-align: middle;
        }
    `;

    const { series } = useParams();
    const [{ seriesInfo }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${series}/info?`;

        const fetchData = async () => {
            // dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                const seriesInfo = json.series;
                dispatch({ type: 'setSeriesInfo', seriesInfo });
                // dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [series, dispatch]);

    const headerNames = ['id', 'name', 'team'];

    const headerRow = () => {
        const headerNames = Object.keys(seriesInfo);
        return headerNames.map(name => {
            return <th key={name}>{name}</th>;
        });
    };

    const bodyRow = () => {
        const bodyValues = Object.values(seriesInfo);
        return bodyValues.map((value, index) => {
            return <td key={index}>{value}</td>;
        });
    };

    return (
        <React.Fragment>
            {seriesInfo && (
                <div css={tableStyles}>
                    <table>
                        <thead>
                            <tr>{headerRow()}</tr>
                        </thead>
                        <tbody>
                            <tr>{bodyRow()}</tr>
                        </tbody>
                    </table>
                </div>
            )}
        </React.Fragment>
    );
};

export default ParentItem;
