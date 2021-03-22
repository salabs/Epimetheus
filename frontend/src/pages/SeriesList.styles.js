import styled from 'styled-components';

export const SelectedTeamContainer = styled.div`
    background: var(--hermanni-grey-lighter);

    .selectedTeamHeading {
        flex: 1 100%;
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-size: 12px;
            color: var(--evidence-grey);
            vertical-align: -webkit-baseline-middle;
        }
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(
        auto-fit,
        minmax(calc(var(--max-page-width) / 4 - var(--space-16)), 1fr)
    );
    width: 100%;
    height: 100%;
`;

export const SeriesCount = styled.span`
    margin-right: 16px;
`;
