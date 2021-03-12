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
