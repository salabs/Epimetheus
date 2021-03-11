import styled from 'styled-components';

export const ScrollButton = styled.button`
    position: absolute;
    height: 100%;
    width: 50px;
    background: white;
    top: 0;
    border: 0;

    &::before {
        position: absolute;
        top: 0;
        content: '';
        width: 20px;
        height: 100%;
        z-index: 1;
    }

    &[disabled] {
        opacity: 0.2;

        &::before {
            content: none;
        }
    }

    &.left {
        left: -50px;

        &::before {
            right: -20px;
            background-image: linear-gradient(
                to left,
                rgba(255, 255, 255, 0.001),
                var(--hermanni-grey)
            );
        }
    }

    &.right {
        right: -50px;

        &::before {
            left: -20px;
            background-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.001),
                var(--hermanni-grey)
            );
        }
    }

    img {
        width: 15px;
    }
`;
