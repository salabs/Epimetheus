import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid var(--hermanni-grey);
    border-radius: 4px;
    padding: 0 16px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    :hover {
        cursor: pointer;
    }

    font-size: 20px;
    font-family: 'Noto Serif';
`;

export const SplitBorder = styled.div`
    background: var(--hermanni-grey);
    opacity: 0.4;
    height: ${props => (props.open ? '4px' : '0px')};
`;

export const TableContainer = styled.div`
    display: flex;

    .Open,
    .Close {
        max-height: 0;
        overflow-y: hidden;
        padding: 0;
        -webkit-transition: max-height 0.3s ease-in-out;
        -moz-transition: max-height 0.3s ease-in-out;
        -o-transition: max-height 0.3s ease-in-out;
        transition: max-height 0.3s ease-in-out;
        -webkit-transition: padding 0.25s ease;
        -moz-transition: padding 0.25s ease;
        -o-transition: padding 0.25s ease;
        transition: padding 0.25s ease;
    }

    .Open {
        max-height: 500px;
        padding: 16px 0;
    }
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

    a:hover {
        color: var(--titan-green-darker);
    }
`;
