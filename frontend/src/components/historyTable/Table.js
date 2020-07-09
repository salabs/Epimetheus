// eslint-disable-next-line
import React, { useContext } from 'react';

import Heading from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';

const TableStyled = styled.table`
    overflow: auto;
    clear: both;
    border-collapse: collapse;
    table-layout: fixed;
    padding: 10px;
    border: 1px solid black;
    text-align: left;
    vertical-align: top;

    thead {
        background: blue;
    }

    th {
        background: #ddd;
        padding: 10px;
        border: 1px solid black;
        text-align: left;
        vertical-align: middle;
    }

    .centerTableCellContent {
        text-align: center;
        vertical-align: middle;
    }
`;

const Table = () => {
    const [
        {
            historyDataState: { max_build_num },
        },
    ] = useStateValue();

    if (max_build_num > 0) {
        return (
            <div>
                <TableStyled id="history-table">
                    <Heading />
                    <tbody id="history-table-body">
                        <Body />
                    </tbody>
                </TableStyled>
            </div>
        );
    } else {
        return <NotFound />;
    }
};

export default Table;
