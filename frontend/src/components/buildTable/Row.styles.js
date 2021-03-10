import styled from 'styled-components';

export const SuiteRow = styled.tr`
    border-top: ${props => props.position !== 0 && 'none !important'};

    &:hover {
        &:last-of-type {
            td:first-of-type {
                border-radius: 0 !important;
            }

            th {
                border-radius: 0 0 0 10px;
            }
        }

        th {
            background-color: var(--nero-white);
        }
    }

    &.childless {
        &:hover {
            th {
                background: inherit;
                & ~ td {
                    background: inherit;
                }
            }
        }
    }

    &:not(.childless) {
        th:hover {
            & ~ td {
                background: white;
            }
        }
    }

    td {
        border-bottom: 0 !important;

        &:first-of-type {
            padding-left: 0 !important;
        }
    }
`;

export const LinkSuiteName = styled.th`
    font-weight: normal;
    text-align: left;
    border-top: 1px solid var(--hermanni-grey);

    & ~ td {
        border-top: 1px solid var(--hermanni-grey);
    }

    span {
        display: inline-block;
    }

    ${calculateSpanMargin()};
`;

function calculateSpanMargin() {
    let spansMarginRules = [];

    for (let i = 0; i < 11; i++) {
        spansMarginRules.push(
            `span:nth-of-type(${i}) { margin-left: ${8 * i}px }`
        );
    }

    return spansMarginRules;
}
