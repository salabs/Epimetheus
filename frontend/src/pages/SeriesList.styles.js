import styled from 'styled-components';

export const SelectedTeamContainer = styled.div`
    background: var(--hermanni-grey-lighter);

    .selected-team-heading {
        flex: 1 100%;
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export const CardContainer = styled.div`
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

export const SeriesCount = styled.span`
    font-size: 12px;
    color: var(--evidence-grey);
    margin-right: var(--space-16);
`;
