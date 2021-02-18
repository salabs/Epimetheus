import styled from 'styled-components';
import theme from './styles/theme';

export const StyledApp = styled.div`
    max-width: var(--max-page-width);
    background-color: var(--nero-white);
    color: #222;
    margin: 0 auto;
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
