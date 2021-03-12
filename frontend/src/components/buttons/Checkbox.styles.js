// Not used anywhere!

import styled from 'styled-components';

export const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 40px 20px 0px;
`;

export const StyledCheckbox = styled.input`
    border: 1px solid var(--hermanni-grey);
    border-radius: 10px;
    background-color: white;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
`;

export const SelectedCheckbox = styled(StyledCheckbox)`
    background-color: transparent !important;
    border: 2px solid var(--pirlo-blue-darker) !important;
    color: var(--pirlo-blue-darker) !important;
`;

export const Header = styled.h3`
    padding-left: 7px;
`;
