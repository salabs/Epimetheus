import styled from 'styled-components';

export const baseTable = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: separate !important;
    border-spacing: 0;
    text-align: left;
    vertical-align: top;
    word-wrap: break-word;

    thead {
        background: var(--hermanni-grey);
    }

    td {
    }
    td.test-result-undefined {
        background: var(--hermanni-grey);
    }

    td,
    th {
        padding: 8px;
        text-align: left;
        word-wrap: break-word;
        vertical-align: top;
    }

    td {
        background: var(--nero-white);
    }

    tr {
        border-top: 1px solid var(--hermanni-grey);
    }
    a {
        text-decoration: none;
    }
`;

export const overviewElement = styled.div`
    padding: 10px;
    border-style: solid;
    border-width: thin;
    display: block;
    margin: 20px;
    height: min-content;
`;

export const ContainerGrid12 = styled.div`
    max-width: calc(var(--max-page-width) + calc(100% / 12) + calc(100% / 12));
    padding-right: calc(100% / 12);
    padding-left: calc(100% / 12);
    margin: 0 auto;
`;

export const ContentGrid6 = styled.div`
    max-width: 100%;
    margin: 0 calc(100% / 12);
`;

export const SpreadSheetTable = styled.table`
    width: 100%;
    border-collapse: separate;
    font-size: 12px;
    line-height: 20px;
    border: 1px solid var(--evidence-grey-lighter);
    border-radius: 10px;
    border-spacing: 0;

    thead {
        border-radius: 4px;
        text-align: left;

        & tr th {
            padding: var(--space-8) var(--space-16) var(--space-4) 0;
            background-color: var(--hermanni-grey);
            &:first-of-type {
                border-radius: 10px 0 0 0;
                padding-left: var(--space-8);
            }
            &:last-of-type {
                border-radius: 0 10px 0 0;
                padding-right: var(--space-8);
            }
        }
    }

    tbody {
        & tr {
            vertical-align: top;

            &:hover {
                background-color: var(--kumpula-yellow);
            }

            &:last-of-type {
                border-bottom: 0;

                & td:first-of-type {
                    border-radius: 0 0 0 10px;
                }

                & td:last-of-type {
                    border-radius: 0 0 10px 0;
                }
            }

            & td {
                border-bottom: 1px solid var(--hermanni-grey);
                position: relative;
                padding: var(--space-4) var(--space-8) var(--space-4) 0;

                &:first-of-type {
                    padding-left: var(--space-8);
                }

                &:last-of-type {
                    padding-right: var(--space-8);
                }
            }
        }
    }

    a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
            display: inline-block;
        }

        &:active {
            color: var(--pirlo-blue);
        }
    }
`;

export const SimpleTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    line-height: 20px;

    thead {
        text-align: left;

        & tr th {
            padding: 8px 0 4px 0;
        }
    }

    tbody {
        & tr {
            border-bottom: 1px solid var(--hermanni-grey);
            vertical-align: top;

            &:hover {
                background-color: var(--kumpula-yellow);
            }

            &:last-of-type {
                border-bottom: 0;
            }

            & td {
                padding: 1px 0;
                position: relative;

                &:first-of-type {
                    padding-left: 2px;
                }

                &::before {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background: white;
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                &::after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background: white;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
        }
    }

    a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }

        &:active {
            color: var(--pirlo-blue);
        }
    }
`;
