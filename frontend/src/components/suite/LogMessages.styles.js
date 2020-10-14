import styled from 'styled-components';

export const SelectedTestContainer = styled.div`
    background: #fff;
    margin-top: 5px;
    padding: 0 198px 64px 198px;
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 1280px) {
        padding: 0 108px 24px 108px;
    }
    table {
        border-collapse: separate !important;
        border-spacing: 0;
        table-layout: fixed;
        width: 100%;
        border: 1px solid var(--hermanni-grey);
        border-radius: 8px;
    }
    thead {
        background: var(--hermanni-grey);
        text-align: left;

        th {
            color: var(--gradient-black);
            font-weight: bold;
            padding: 8px 0;
        }

        th:first-child {
            padding-left: 8px;
        }
    }
    .table-item {
        padding: 0.25rem 0rem;
        white-space: normal;
        overflow: hidden;
    }

    tbody tr {
        border-bottom: 1px solid #eee;
    }

    tbody td:first-child {
        padding-left: 8px;
    }

    .tableLogLevel {
        width: 10%;
    }
    .tableMessage {
        width: 70%;
    }
    .tableTimeStamp {
        width: 20%;
    }
`;

export const FlexGrowColumn = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 5px;
`;

export const LogRow = styled.tr`
    background: ${props =>
        props.log_level === 'FAIL' && 'var(--nelson-purple)'};
    color: ${props => props.log_level === 'FAIL' && 'var(--nero-white)'};
`;

export const InfoLevel = styled.td`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        position: relative;
        top: -2px;
        left: -16px;
    }
`;
