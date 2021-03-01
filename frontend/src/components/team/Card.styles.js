import styled from 'styled-components';

export const CardSection = styled.section`
    background-color: var(--nero-white);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 7px, rgba(0, 0, 0, 0.23) 0px 5px 7px;
    margin: 10px;
    line-height: 16px;
    min-height: 120px;
    width: 344px;
    height: 232px;
    padding: 16px;
    cursor: pointer;

    div {
        margin-top: 12px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
`;

export const CardHeading = styled.p`
    color: var(--titan-green);
    overflow-wrap: break-word;
    max-width: 290px;
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    font-family: 'Noto Serif Semibold';
    display: block;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`;

export const StyledSpan = styled.span`
    color: var(--pirlo-blue);
`;
