import styled from 'styled-components';

export const StyledTable = styled.table`
    position: relative;
    border-top: 3px solid var(--hermanni-grey);
    width: 100%;

    &::after {
        content: '';
        position: absolute;
        right: -20px;
        top: 0;
        display: inline-block;
        width: 20px;
        height: 100%;
    }

    th {
        border-bottom: 1px solid var(--hermanni-grey);
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
    }

    td {
        border-bottom: 1px solid var(--hermanni-grey);
        padding-left: 5px;
        padding-right: 5px;
        text-align: left;
        vertical-align: top;

        &.keyword {
            word-break: break-word;
            min-width: 300px;
        }
    }
`;
