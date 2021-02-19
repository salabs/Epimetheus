// eslint-disable-next-line
import React from 'react';
import Heading from './Heading';
import Body from './Body';
import NotFound from '../NotFound';
import { useStateValue } from '../../contexts/state';
import { OverflowWrapper, TableStyled, TableWrapper } from './Table.styles';

const Table = () => {
    const [
        {
            historyDataState: { max_build_num },
        },
    ] = useStateValue();

    if (max_build_num > 0) {
        return (
            <TableWrapper>
                <OverflowWrapper>
                    <TableStyled id="history-table">
                        <Heading />
                        <tbody id="history-table-body">
                            <Body />
                        </tbody>
                    </TableStyled>
                </OverflowWrapper>
            </TableWrapper>
        );
    } else {
        return <NotFound />;
    }
};

export default Table;
