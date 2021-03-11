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
            white-space: nowrap;
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
    background-color: ${props =>
        props.log_level === 'FAIL' && 'var(--nelson-purple)'};
    color: ${props => props.log_level === 'FAIL' && 'var(--nero-white)'};

    .suite-log-message {
        .can-be-opened {
            &::after {
                background-color: ${props =>
                    props.log_level === 'FAIL' && 'var(--nelson-purple)'};
            }
        }
    }
`;

export const InfoLevel = styled.td`
    span {
        position: relative;
        top: -2px;
        margin: 0 10px;
    }
`;

export const TableWrapper = styled.div`
    max-width: calc(100% + 40px);
    position: relative;
    margin: 0 -20px;
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 20px;
        height: 100%;
        background-image: linear-gradient(
            to right,
            white,
            rgba(255, 255, 255, 0.001)
        );
        z-index: 1;
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: '';
        width: 20px;
        height: 100%;
        background-image: linear-gradient(
            to left,
            white,
            rgba(255, 255, 255, 0.001)
        );
    }
`;

export const OverflowWrapper = styled.div`
    display: inline-block;
    overflow-x: auto;
    position: relative;
    max-width: 100%;
    width: 100%;
    padding: 0 20px;
`;
