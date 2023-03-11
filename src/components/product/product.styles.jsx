import styled from "styled-components";

const productImageHeightPercent = 89;

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 50rem;
  align-items: center;
  position: relative;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.03);

  .img-container {
    width: 100%;
    height: ${productImageHeightPercent}%;
    overflow: hidden;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s;
  }

  button {
    width: 80% !important;
    opacity: 0.7;
    position: absolute;
    top: 70%;
    display: none;
    transition: all 0.2s;
  }

  &:hover button:hover {
    opacity: 1;
  }

  &:hover {
    img {
      filter: blur(0.3rem) brightness(80%);
      transform: scale(1.2);
    }

    button {
      opacity: 0.9;
      display: flex;
    }
  }

  .footer {
    width: 100%;
    height: ${100 - productImageHeightPercent}%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.8rem;
    padding: 0 0.5rem;
  }
`;
