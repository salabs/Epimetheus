import styled from 'styled-components';

export const LastBuildTable = styled.table`
    width: 100%;

    th {
        margin: 20px;
        text-align: left;
        vertical-align: middle;
    }

    td {
        margin: 20px;
        padding-right: 5px;
        text-align: left;
        vertical-align: middle;
    }

    td:nth-of-type(1) {
        width: 40%;
    }

    td:nth-of-type(2) {
        width: 50%;
    }
`;
