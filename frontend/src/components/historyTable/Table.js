// eslint-disable-next-line
import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Heading from './Heading';
import Body from './Body';

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
};

export default Table;
