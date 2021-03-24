import styled from 'styled-components';

function roundCorners() {
    let rules = [];
    for (let i = 0; i < 4; i++) {
        const pageMinWidth = 363;
        const breakpointWidth = 385;
        const mediaQuery = `@media only screen and
                    (min-width: ${pageMinWidth + breakpointWidth * i}px) and
                    (max-width: ${pageMinWidth + breakpointWidth * (i + 1)}px)`;
        const everyNth = `${i + 1}n + 1`;

        rules.push(`${mediaQuery} {
            // only card OR first row's last card
            &:only-of-type,
            &:nth-of-type(${i + 1}) {
                border-top-right-radius: var(--space-8);
            }

            // first card
            &:first-of-type {
                border-top-left-radius: var(--space-8);

                // next card to first card is also the last
                &+:last-of-type {
                    border-top-right-radius: var(--space-8);
                }
            }

            // last row's first and last card OR last full row's first card
            &:nth-of-type(${everyNth}):last-of-type,
            &:nth-of-type(${everyNth}):nth-last-of-type(${i + 1}) {
                border-bottom-left-radius: var(--space-8);
            }

            // last card
            &:last-of-type {
                border-bottom-right-radius: var(--space-8);

                // last card that's also second last card (first out of two)
                &:nth-last-of-type(2) {
                    border-top-right-radius: var(--space-8);
                }
            }
        }`);
        if (i >= 2) {
            // when grid row can contain more than 3 cards, but last row only contains:
            // 2-3 cards in 4 card row OR
            // 2 cards in 3 card row
            rules.push(
                `${mediaQuery} {
                        &:nth-of-type(${everyNth}):nth-last-of-type(2),
                        &:nth-of-type(${everyNth}):nth-last-of-type(${i}) {
                            border-bottom-left-radius: var(--space-8);
                        }
                    }`
            );
        }
        if (i === 3) {
            // if grid row can contain 4 cards, but there's only 3
            rules.push(
                `${mediaQuery} {
                        &:nth-of-type(${i}):last-of-type {
                            border-top-right-radius: var(--space-8);
                        }
                    }`
            );
        }
    }
    return rules;
}

export const CardSection = styled.section`
    background-color: var(--nero-white);
    box-shadow: 0 2px var(--space-4) var(--hermanni-grey);
    border: 1px solid var(--hermanni-grey);
    display: ${props => (props.grid === true ? 'grid' : 'block')};
    padding: ${props =>
        props.grid === true ? '0 var(--space-16)' : 'var(--space-16)'};
    min-height: 232px;
    word-break: break-word;

    ${roundCorners()};
`;

export const CardHeading = styled.span`
    font-size: 20px;
    font-weight: 500;
    font-family: 'Noto Serif Semibold';
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
`;

export const CardContainer = styled.div`
    background: var(--hermanni-grey-lighter);

    .selected-team-heading {
        flex: 1 100%;
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export const CardContainerGrid = styled.div`
    display: grid;
    grid-gap: var(--space-16);
    grid-template-columns: repeat(
        auto-fit,
        minmax(calc(var(--max-page-width) / 4 - var(--space-16)), 1fr)
    );
    width: 100%;
    height: 100%;
    padding-bottom: var(--space-40);
`;

export const InfoContainer = styled.span`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;

    &.number-of-series {
        margin-top: var(--space-8);
    }

    & + .card-info-container {
        border-top: 1px solid var(--hermanni-grey);
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'FAIL' ? 'var(--nelson-purple)' : 'var(--pirlo-blue)'};
`;
