import styled from 'styled-components';

export const SuiteRow = styled.tr`
    border-top: ${props => props.position !== 0 && 'none !important'};
`;

export const StyledTestRow = styled.td`
    text-align: center !important;
    border-top: none;
`;

export const LinkSuiteName = styled.td`
    span:nth-child(4) {
        padding-left: 8px;
    }
    span:nth-child(6) {
        padding-left: 16px;
    }
    span:nth-child(8) {
        padding-left: 24px;
    }
    span:nth-child(10) {
        padding-left: 32px;
    }
    span:nth-child(12) {
        padding-left: 40px;
    }
    span:nth-child(14) {
        padding-left: 48px;
    }
    span:nth-child(16) {
        padding-left: 56px;
    }
    span:nth-child(18) {
        padding-left: 64px;
    }
    span:nth-child(20) {
        padding-left: 72px;
    }
`;
