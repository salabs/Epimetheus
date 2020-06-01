// eslint-disable-next-line
import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ThemeContext from '../../contexts/themeContext';
import Body from './Body';

const Table = ({ id }) => {
    const theme = useContext(ThemeContext);

    const tableStyles = css`
        ${theme.baseTableStyle}
        overflow: auto;
        font-size: 12px;

        table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse;
        }

        thead th:nth-of-type(1) {
            width: 10%;
        }

        thead th:nth-of-type(2) {
            width: 2.8%;
        }

        thead th:nth-of-type(3) {
            width: 10%;
        }

        thead th:nth-of-type(4) {
            width: 8%;
        }

        thead th:nth-of-type(5) {
            width: 3%;
        }

        thead th:nth-of-type(6) {
            width: 4%;
        }
        overflow: auto;

        ${theme.baseTableStyle}
    `;

    return (
        <div css={tableStyles}>
            <table id="last-run-table">
                <thead>
                    <tr>
                        <th>Suitename</th>
                        <th className="centerTableCellContent">Status</th>
                        <th>Tests</th>
                        <th>Error messages</th>
                        <th className="test-time-row">Time</th>
                        <th className="centerTableCellContent">Flakiness</th>
                    </tr>
                </thead>
                <tbody>
                    <Body id={id} />
                </tbody>
            </table>
        </div>
    );
};

export default Table;
