import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid var(--tonic-grey);
    border-radius: var(--space-4);
    width: 100%;
    padding: var(--space-8);
    margin: var(--space-24) 0;

    > * {
        padding: 0 var(--space-8);
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

    &:hover {
        background-color: var(--hermanni-grey-lighter);
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
        padding-top: var(--space-4);
        padding-bottom: var(--space-4);
        line-height: var(--space-24) !important; // same as h4's
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
        max-height: 5000px;
    }

    table {
        overflow: hidden;
        word-break: break-word;

        th:first-of-type {
            min-width: 110px;
        }
    }
`;

export const SplitBorder = styled.div`
    background: var(--hermanni-grey-lighter);
    height: var(--space-4);
    margin-top: var(--space-8);
`;
