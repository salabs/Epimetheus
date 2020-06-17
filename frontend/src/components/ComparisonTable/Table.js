// eslint-disable-next-line
import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ThemeContext from '../../contexts/themeContext';
import { useStateValue } from '../../contexts/state';

import Body from './Body';

const Table = () => {
    const [
        { 
          parentData: {buildData} ,
        }
    ] = useStateValue();

    const theme = useContext(ThemeContext);

    const tableStyles = css`
        ${theme.baseTableStyle}
        overflow: auto;

        table {
            table-layout: fixed;
            width: 100%;
            border-collapse: collapse;
        }

        thead th:nth-of-type(1) {
            width: 80%;
        }

        thead th:nth-of-type(2) {
            width: 10%;
        }

        thead th:nth-of-type(3) {
            width: 10%;
        }

        overflow: auto;

        ${theme.baseTableStyle}
    `;

    return (
        <div css={tableStyles}>
            <table id="comparison-table">
                <thead>
                    <tr>
                        <th>Full Test Name</th>
                        <th className="centerTableCellContent">{buildData.name} Status</th>
                        <th className="centerTableCellContent">{buildData.name2} Status</th>
                    </tr>
                </thead> 
                <tbody>
                    <Body />
                </tbody>
            </table>
        </div>
    );
};

export default Table;
