import styled from 'styled-components';

export const SelectedTestContainer = styled.div`
    background: var(--nero-white);
    margin-top: 5px;

    table {
        border-collapse: separate !important;
        border-spacing: 0;
        width: 100%;
        border: 1px solid var(--hermanni-grey);
        border-radius: 8px;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            right: -20px;
            top: 0;
            display: inline-block;
            width: 20px;
            height: 100%;
        }
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
        display: inline-block;
    }

    tbody tr {
        border-bottom: 1px solid var(--hermanni-grey);
    }

    tbody td {
        vertical-align: top;
        &:first-child {
            padding-left: 8px;
        }
    }

    .suite-log-message {
        > div {
            width: calc(100vw / 2.5);
            word-break: break-word;
        }
    }
`;

export const LogRow = styled.tr`
    background: ${props =>
        props.log_level === 'FAIL' && 'var(--nelson-purple)'};
    color: ${props => props.log_level === 'FAIL' && 'var(--nero-white)'};
`;

export const InfoLevel = styled.td`
    span {
        position: relative;
        top: -2px;
        margin: 0 10px;
    }
`;
