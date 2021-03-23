import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardSection = styled.section`
    background-color: var(--nero-white);
    box-shadow: 0 2px var(--space-4) var(--hermanni-grey);
    border: 1px solid var(--hermanni-grey);
    display: grid;
    padding: 0 var(--space-16);
    min-height: 232px;
    word-break: break-word;

    ${roundCorners()};
`;

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

export const CardTitle = styled(Link)`
    text-decoration: none;
    margin: 2px var(--space-16) 0 0;
`;

export const CardSubTitle = styled(Link)`
    font-family: 'Noto Serif';
    text-transform: uppercase;
    text-decoration: none;
`;

export const InfoContainer = styled.span`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;

    & + .card-info-container {
        border-top: 1px solid var(--hermanni-grey);
    }
`;

export const CardValue = styled.span`
    color: var(--pirlo-blue);

    svg {
        background-color: var(--hermanni-grey-lighter);
        transform: scale(1.5);
        position: relative;
        right: var(--space-4);

        &[name='Fail'] {
            background-color: transparent;
        }
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'FAIL' ? 'var(--nelson-purple)' : 'var(--pirlo-blue)'};
`;
