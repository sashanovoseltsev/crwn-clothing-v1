import styled from "styled-components";

export const CartIconContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transform: translateY(-2px);

  transition: all 0.2s;

  &:hover {
    background-color: #333;
    transform: translateY(-5px);
    box-shadow: 0 2rem 4rem rgba(#000, 0.2);
  }

  &:hover .icon g path {
    fill: #fff;
  }

  &:hover .count {
    color: #fff;
  }

  .icon {
    width: 2.4rem;
    height: 2.4rem;

    g path {
      fill: #333;

      transition: all 0.2s;
    }
  }

  .count {
    position: absolute;
    font-size: 1rem;
    font-weight: bold;
    bottom: 1.2rem;
    color: #333;

    transition: all 0.2s;
  }
`;
