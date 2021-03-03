import styled from 'styled-components';
import theme from './styles/theme';

export const StyledApp = styled.div`
    background-color: var(--nero-white);
    color: var(--gradient-black);
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
