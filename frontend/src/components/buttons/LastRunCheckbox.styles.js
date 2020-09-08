import styled from 'styled-components';

export const CheckBoxContainer = styled.div`
    margin: 16px 0;
`;

export const Header = styled.div`
    color: var(--evidence-grey);
    margin: 8px 0 4px 0;
`;

export const StyledDiv = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--hermanni-grey);
    border-radius: 4px;
    width: 10%;

    @media only screen and (max-width: 1280px) {
        width: 20%;
    }
    @media only screen and (max-width: 768px) {
        width: 30%;
    }

    span {
        padding-right: 8px;
        position: relative;
        top: -1.5px;
    }
`;

export const StyledLabel = styled.label`
    margin-right: 20px;
    display: block;
    float: left;
`;

export const StyledInput = styled.input`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;
