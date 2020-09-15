import styled from 'styled-components';
import theme from './styles/theme';

export const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background-color: var(--nero-white);
    color: #222;
    p {
        line-height: 1.6;
    }

    a {
        color: var(--titan-green);
    }
    select:focus,
    input:focus {
        outline: 1px solid ${theme.testTheme.linkColor};
    }
`;

export const SkipMain = styled.a`
    left: -999px;
    position: absolute;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -999;
    :focus,
    :active {
        background-color: #fff;
        left: auto;
        top: auto;
        width: 30%;
        height: auto;
        overflow: auto;
        margin: 10px 35%;
        padding: 5px;
        border: 1px solid black;
        text-align: center;
        z-index: 999;
    }
`;
