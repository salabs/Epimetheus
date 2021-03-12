﻿import styled from 'styled-components';

export const StyledRow = styled.td`
    font-size: 14px;
    white-space: nowrap;
    span {
        width: 13px;
    }
    span + span {
        margin-left: 2px;
    }
`;
