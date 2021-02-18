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

    @media only screen and (max-width: 1024px) {
        padding: 24px 40px;
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(
        auto-fit,
        minmax(calc(var(--max-page-width) / 4 - 16px), 1fr)
    );
    width: 100%;
    height: 100%;
`;

export const CardSection = styled.section`
    background-color: var(--nero-white);
    box-shadow: 0px 2px 4px #eeecec;
    border-radius: 8px 0px 0px 0px;
    border: 1px solid #eeecec;
    display: grid;
    padding: 0 16px;
    height: 232px;
    word-break: break-word;

    .cardHeading {
        font-size: 20px;
        font-weight: 500;
        font-family: 'Noto Serif Semibold';
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0;
    }
    p {
        margin: 0;
    }
`;

export const HoverDiv = styled.div`
    :hover {
        cursor: pointer;
    }

    .cardInfoContainer + .cardInfoContainer {
        border-top: 1px solid var(--hermanni-grey);
    }
`;

export const CardSubTitle = styled.p`
    color: var(--titan-green);
    font-family: 'Noto Serif';
    margin: 0;
    text-transform: uppercase;
`;

export const CardHeading = styled.p`
    color: var(--titan-green);
    overflow-wrap: break-word;
    max-width: calc(100% - 24px);
    margin: 0;
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`;

export const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
    :hover {
        background-color: var(--hermanni-grey);
    }
`;

export const CardValue = styled.span`
    color: var(--pirlo-blue);

    svg {
        background: var(--hermanni-grey-lighter);
        transform: scale(1.5);
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'FAIL' ? 'var(--nelson-purple)' : 'var(--pirlo-blue)'};
`;

export const SeriesCount = styled.span`
    margin-right: 16px;
`;
