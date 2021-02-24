import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid var(--tonic-grey);
    border-radius: 4px;
    padding: 8px;
    margin: 0 182px;

    @media only screen and (max-width: 1024px) {
        margin: 0 80px;
    }

    > * {
        padding: 0 8px;
    }
`;

export const HeaderContainer = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-family: 'Noto Serif';
    width: 100%;
    border: 0;
    background: var(--nero-white);

    &:hover:enabled {
        text-decoration: none;
        color: var(--gradient-black);
    }

    &[aria-expanded='true'] {
        p {
            color: var(--pirlo-blue);
        }

        &:hover:enabled {
            background-color: var(--nero-white);
        }
    }

    p {
        margin: 0;
        padding-top: 4px;
        padding-bottom: 4px;
        line-height: 24px !important; // same as h4's
    }

    .caret {
        line-height: 0;
    }
`;

export const Content = styled.div`
    &.Open,
    &.Close {
        visibility: hidden;
        max-height: 0;
        overflow-y: hidden;
        transition: all 0.2s ease-in-out;
    }

    &.Open {
        visibility: visible;
        max-height: 500px;
    }
`;

export const SplitBorder = styled.div`
    background: var(--hermanni-grey-lighter);
    height: 4px;
    margin-top: 8px;
`;

export const TableContainer = styled.table`
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
