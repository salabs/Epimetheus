import styled from 'styled-components';

export const ScrollButton = styled.button`
    position: absolute;
    height: 100%;
    width: var(--space-48);
    background: white;
    top: 0;
    border: 0;

    &::before {
        position: absolute;
        top: 0;
        content: '';
        width: var(--space-24);
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
        left: calc(var(--space-48) * -1);

        &::before {
            right: calc(var(--space-24) * -1);
            background-image: linear-gradient(
                to left,
                rgba(255, 255, 255, 0.001),
                var(--hermanni-grey)
            );
        }
    }

    &.right {
        right: calc(var(--space-48) * -1);

        &::before {
            left: calc(var(--space-24) * -1);
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
