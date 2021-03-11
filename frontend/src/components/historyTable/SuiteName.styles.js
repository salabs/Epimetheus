import styled from 'styled-components';

export const StyledData = styled.th`
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
