import styled from 'styled-components';

export const SuiteRow = styled.tr`
    border-top: ${props => props.position !== 0 && 'none !important'};
`;

export const LinkSuiteName = styled.td`
    text-align: left !important;

    span:nth-child(4) {
        margin-left: 8px;
    }
    span:nth-child(6) {
        margin-left: 16px;
    }
    span:nth-child(8) {
        margin-left: 24px;
    }
    span:nth-child(10) {
        margin-left: 32px;
    }
    span:nth-child(12) {
        margin-left: 40px;
    }
    span:nth-child(14) {
        margin-left: 48px;
    }
    span:nth-child(16) {
        margin-left: 56px;
    }
    span:nth-child(18) {
        margin-left: 64px;
    }
    span:nth-child(20) {
        margin-left: 72px;
    }
`;
