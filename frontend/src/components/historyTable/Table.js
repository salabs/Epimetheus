// eslint-disable-next-line
import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Heading from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { useStateValue } from '../../contexts/state';

const Table = () => {
    const tableStyles = css`
        overflow: auto;
        clear: both;

        table {
            border-collapse: collapse;
            table-layout: fixed;
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
            background: var(--powder-white);
        }
        td.test-result-undefined {
            background: var(--mithril-grey);
        }
        .centerTableCellContent {
            text-align: center;
            vertical-align: middle;
        }
    `;
    const [
        {
            historyDataState: { max_build_num }
        }
    ] = useStateValue();

    if (max_build_num > 0) {
        return (
            <div css={tableStyles}>
                <table id="history-table">
                    <Heading />
                    <tbody id="history-table-body">
                        <Body />
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <NotFound />;
    }
};

export default Table;
