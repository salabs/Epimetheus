import styled from 'styled-components';

export const TableWrapper = styled.div`
    position: relative;
`;

export const OverflowWrapper = styled.div`
    overflow-x: auto;
    position: relative;
    width: 100%;
`;

export const SpreadSheetTable = styled.table`
    width: 100%;
    border-collapse: separate;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid var(--evidence-grey-lighter);
    border-radius: var(--space-8);
    border-spacing: 0;
    overflow: hidden;

    thead {
        text-align: left;

        tr th {
            padding: var(--space-8) var(--space-16) var(--space-4) 0;
            background-color: var(--hermanni-grey);

            &:first-of-type {
                padding-left: var(--space-8);
            }

            &:last-of-type {
                padding-right: var(--space-8);
            }
        }
    }

    tbody {
        tr {
            vertical-align: top;

            &:hover {
                background-color: var(--kumpula-yellow);
            }

            td {
                border-bottom: 1px solid var(--hermanni-grey);
                position: relative;
                padding: var(--space-4) var(--space-16) var(--space-4) 0;

                &:first-of-type {
                    padding-left: var(--space-8);
                }

                &:last-of-type {
                    padding-right: var(--space-8);
                }

                a {
                    &:visited {
                        color: var(--evidence-grey);
                    }
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

export const SimpleTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    line-height: 20px;

    thead {
        text-align: left;

        & tr th {
            padding: var(--space-8) 0 var(--space-4) 0;
        }
    }

    tbody {
        tr {
            border-bottom: 1px solid var(--hermanni-grey);
            vertical-align: top;

            &:hover {
                background-color: var(--kumpula-yellow);
            }

            &:last-of-type {
                border-bottom: 0;
            }

            td {
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

                a {
                    &:visited {
                        color: var(--evidence-grey);
                    }
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
