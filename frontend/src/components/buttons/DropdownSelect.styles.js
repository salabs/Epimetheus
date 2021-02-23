import styled from 'styled-components';
import caretDown from '../../images/caret-down.svg';

export const DropdownWrapper = styled.div`
    .ReactA11ySelect {
        width: 100%;
        position: relative;
    }

    .ReactA11ySelect__button {
        width: 100%;
        height: 36px;
        padding: 0 10px 0 15px;
        background-color: var(--nero-white);
        border: 1px solid var(--tonic-grey);
        white-space: nowrap;
        display: flex;
        justify-content: space-between;
        line-height: 36px;
    }

    .ReactA11ySelect__button:enabled:hover {
        color: var(--gradient-black);
        text-decoration: none;
    }

    .ReactA11ySelect__button:enabled:focus::before {
        content: ' ';
        position: absolute;
        z-index: 0;
        top: -4px;
        left: -4px;
        width: calc(100% + 8px);
        border: 4px solid var(--sparkling-blue);
        height: calc(100% + 8px);
        border-radius: 8px;
    }

    .ReactA11ySelect__button > span:first-child {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .ReactA11ySelect__button[aria-expanded='true'] {
        background-color: var(--nero-white);
        border: 1px solid var(--tonic-grey);
    }

    .ReactA11ySelect__button__arrow-indicator:after {
        content: url(${caretDown});
        margin-left: 10px;
    }

    .ReactA11ySelect__ul {
        min-width: 100%;
        margin: 0;
        border: 1px solid var(--tonic-grey);
        border-radius: 4px;
        box-shadow: 0 3px 5px 1px var(--tonic-grey);
        padding: 5px 3px;
    }

    .ReactA11ySelect__ul__li:focus {
        background-color: var(--hermanni-grey-lighter);
        color: var(--gradient-black);
        outline: none;
    }

    .ReactA11ySelect__ul__li[aria-checked='true'] {
        background-color: var(--vallila-blue);
        color: var(--pirlo-blue);
        padding: 5px 15px;
    }

    .ReactA11ySelect__ul__li__selected-indicator:after {
        content: '';
    }

    .ReactA11ySelect__ul__li:not([aria-checked='true']) {
        padding: 5px 15px;
    }

    .ReactA11ySelect__ul__li[disabled] {
        cursor: default;
    }
`;

export const Label = styled.label`
    display: inline-block;
    color: var(--evidence-grey);
    margin: 8px 0 9px 0;
`;
