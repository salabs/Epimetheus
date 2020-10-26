import styled from 'styled-components';

export const ParentInfoContainer = styled.div`
    display: flex;
    padding: 24px 0;
`;

export const LastRunContainer = styled.div`
    position: relative;
    margin-top: 10px;
`;

export const TableHeader = styled.h2`
    padding: 40px 198px 0 198px;

    @media only screen and (max-width: 1024px) {
        padding: 40px 108px 0 108px;
    }
`;
