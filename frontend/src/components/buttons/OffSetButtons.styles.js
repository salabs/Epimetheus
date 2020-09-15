import styled from 'styled-components';
import { ReactComponent as EndLeft } from '../../images/chevron-verticalbar-left.svg'

export const OffsetContainer = styled.div`
    margin: 16px 10px;
`;

export const Header = styled.div`
    color: var(--evidence-grey);
    margin: 8px 0 4px 0;
`;

export const StyledEndLeft = styled(EndLeft)`
    left: 25%;
    right: 24.99%;
    top: 6.25%;
    bottom: 6.25%;
`;

export const FlexDiv= styled.div`
    display: flex;
`;

export const StyledDiv = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: row;
    border: 1px solid var(--hermanni-grey);
    border-radius: 4px;

    span {
        padding-right: 8px;
        position: relative;
        top: -1.5px;
    }
`;

export const StyledDirectionButton = styled.button`
    width: 32px;

    margin: 4px;
    background: ${props => props.enabled ? "var(--nero-white)" : "var(--hermanni-grey)"};
    border: 1px solid var(--hermanni-grey);
    box-sizing: border-box;
    border-radius: 4px;
`;

export const LatestButton = styled.button`
    width: 89px;

    padding: 8px;
    margin: 4px;

    background: var(--nero-white);
    border: 1px solid var(--hermanni-grey);
    box-sizing: border-box;
    border-radius: 4px;

    font-family: Space Mono;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;

    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: var(--evidence-grey);
`;

export const StyledLabel = styled.label`
    margin-right: 20px;
    display: block;
    float: left;
`;

export const StyledInput = styled.input`
    display: none;
`;
