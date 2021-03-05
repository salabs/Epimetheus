import styled from 'styled-components';

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
        outline: 0;
        box-shadow: 0 0 0 4px var(--sparkling-blue);
    }
`;
