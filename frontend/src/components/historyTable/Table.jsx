// eslint-disable-next-line
import React from 'react';
import Heading from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { useStateValue } from '../../contexts/state';
import { TableStyled } from './Table.styles';

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
