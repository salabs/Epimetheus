import styled from 'styled-components';

export const ButtonContainer = styled.div`
    margin: 16px 0;
`;

export const Header = styled.div`
    color: var(--evidence-grey);
    margin: 8px 0 4px 0;
`;

export const StyledDiv = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: ${props => props.direction};
    border: 1px solid var(--hermanni-grey);
    border-radius: 4px;
    width: ${props => props.direction==="column" ? "10%" : "30%"};
    max-width: 230px;
    min-width:  ${props => props.direction==="column" ? "200px" : "230px"};
    @media only screen and (max-width: 1280px) {
        width: ${props => props.direction==="column" ? "20%" : "30%"};
    }
    @media only screen and (max-width: 768px) {
        width: 30%
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
    display: none;
`;
