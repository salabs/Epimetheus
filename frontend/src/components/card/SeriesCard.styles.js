import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardSection = styled.section`
    background-color: var(--nero-white);
    box-shadow: 0 2px var(--space-4) var(--hermanni-grey);
    border-radius: var(--space-8) 0 0 0;
    border: 1px solid var(--hermanni-grey);
    display: grid;
    padding: 0 var(--space-16);
    min-height: 232px;
    word-break: break-word;
`;

export const CardHeading = styled.span`
    font-size: 20px;
    font-weight: 500;
    font-family: 'Noto Serif Semibold';
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
`;

export const CardTitle = styled(Link)`
    text-decoration: none;
    margin: 2px var(--space-16) 0 0;
`;

export const CardSubTitle = styled(Link)`
    font-family: 'Noto Serif';
    text-transform: uppercase;
    text-decoration: none;
`;

export const InfoContainer = styled.span`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;

    & + .card-info-container {
        border-top: 1px solid var(--hermanni-grey);
    }
`;

export const CardValue = styled.span`
    color: var(--pirlo-blue);

    svg {
        background-color: var(--hermanni-grey-lighter);
        transform: scale(1.5);
        position: relative;
        right: var(--space-4);

        &[name='Fail'] {
            background-color: transparent;
        }
    }
`;

export const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'FAIL' ? 'var(--nelson-purple)' : 'var(--pirlo-blue)'};
`;
