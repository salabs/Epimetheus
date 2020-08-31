import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid var(--hermanni-grey);
    padding: 0 16px;
    width: 100%;

    .Open,
    .Close {
        max-height: 0;
        overflow-y: hidden;
        -webkit-transition: max-height 0.4s ease-in-out;
        -moz-transition: max-height 0.4s ease-in-out;
        -o-transition: max-height 0.4s ease-in-out;
        transition: max-height 0.4s ease-in-out;
    }

    .Open {
        max-height: 500px;
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    :hover {
        cursor: pointer;
    }

    p {
        font-size: 20px;
        font-family: 'Noto Serif';
    }
`;

export const SplitBorder = styled.div`
    height: 4px;
    background: var(--hermanni-grey);
    opacity: 0.4;
`;

export const TableContainer = styled.div`
    padding: 16px 0;
    display: flex;
`;

export const DataRow = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => (props.first ? '0.35' : '0.65')};

    span {
        border-bottom: 1px solid var(--hermanni-grey);
    }
    span:first-child,
    span:last-child {
        border-bottom: none;
    }
    span:first-child {
        font-weight: bolder;
        padding-bottom: 8px;
    }
`;
