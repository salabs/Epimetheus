import styled from 'styled-components';
import { ReactComponent as EndLeft } from '../../images/chevron-verticalbar-left.svg';

export const Header = styled.div`
    color: var(--evidence-grey);
    margin: 8px 0;
`;

export const StyledEndLeft = styled(EndLeft)`
    left: 25%;
    right: 24.99%;
    top: 6.25%;
    bottom: 6.25%;
`;

export const FlexDiv = styled.div`
    display: flex;
`;

export const StyledDirectionButton = styled.button`
    width: 36px;

    margin: 1px 4px 6px 4px;
    background: ${props =>
        props.disabled ? 'var(--tonic-grey) ' : 'var(--nero-white)'};
    border: 1px solid var(--tonic-grey);
    box-sizing: border-box;
    border-radius: 4px;
`;

export const LatestButton = styled.button`
    width: 89px;
    height: 36px;

    margin: 1px 4px 6px 0;

    background: var(--nero-white);
    border: 1px solid var(--tonic-grey);
    box-sizing: border-box;
    border-radius: 4px;

    font-family: Space Mono;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;

    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: var(--evidence-grey);

    span {
        vertical-align: middle;
    }
`;

export const StyledInput = styled.input`
    border: 1px solid var(--tonic-grey);
    border-radius: 4px;
    max-width: 54px;
    height: 36px;
    margin: 1px 4px 6px 4px;
    text-align: right;
`;
