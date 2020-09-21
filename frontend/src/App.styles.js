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
