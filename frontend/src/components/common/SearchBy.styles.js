import styled from 'styled-components';

export const ToolWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const GroupContainer = styled.div`
    margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
    width: 16rem;

    @media only screen and (max-width: 768px) {
        width: 8rem;
    }
`;
