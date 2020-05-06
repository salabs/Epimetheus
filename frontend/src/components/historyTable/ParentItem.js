import React, { useEffect } from 'react';
import { useParams } from 'react-router';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../../contexts/state';

const ParentItem = () => {
    const tableStyles = css`
        overflow: auto;
        clear: both;

        table {
            border-collapse: collapse;
            table-layout: fixed;
            overflow: auto;
        }
        table,
        th,
        td {
            padding: 10px;
            border: 1px solid black;
            text-align: left;
            vertical-align: top;
        }
        th {
            background: #ddd;
        }
        td {
            background: #fafafa;
        }
        td.test-result-undefined {
            background: #eee;
        }
        .centerTableCellContent {
            text-align: center;
            vertical-align: middle;
        }
    `;

    const { series } = useParams();

    const [{ parentItem }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${series}/info?`;

        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                dispatch({ type: 'setParentItem', parentItem: json });
                dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [series, dispatch]);

    const headerRow = () => {
        const headerNames = Object.keys(parentItem.series);
        return headerNames.map(name => {
            return <th key={name}>{name}</th>;
        });
    };

    const bodyRow = () => {
        const headerValues = Object.values(parentItem.series);
        return headerValues.map((value, index) => {
            return <td key={index}>{value}</td>;
        });
    };

    return (
        <div css={tableStyles}>
            {parentItem && (
                <table>
                    <thead>
                        <tr>{headerRow()}</tr>
                    </thead>
                    <tbody>
                        <tr>{bodyRow()}</tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ParentItem;
