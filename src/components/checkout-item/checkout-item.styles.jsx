import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  align-items: center;
  column-gap: 1rem;
  height: 24rem;
  font-size: 2.2rem;
  overflow: hidden;
  box-sizing: content-box;
  padding-bottom: 3.5rem;

  &:nth-child(n + 1) {
    padding-top: 2rem;
    border-top: 0.15rem solid rgb(121, 121, 121);
  }

  &:nth-last-child(2) {
    border-bottom: 0.15rem solid rgb(121, 121, 121);
  }

  .img-contaienr {
    width: 20rem;
    height: 24rem;
    overflow: hidden;
  }

  .img-contaienr:hover .img {
    transform: scale(1.3);
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: all 0.3s;
  }

  .quantity-container {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
  }

  .qnt {
    margin: 0 1rem;
  }

  .btn {
    display: inline-block;
    font-size: 4rem;
    font-weight: 700;
    transform: translateY(-0.4rem);
    transition: all 0.2s;
    cursor: pointer;
    justify-self: center;
  }

  .price {
    text-align: center;
  }

  .remove {
    font-size: 4rem;
    font-weight: 600;
    transition: all 0.2s;
    padding: 0 2rem;
    cursor: pointer;
    justify-self: center;
  }

  .btn:hover,
  .remove:hover {
    opacity: 0.7;
  }

  .text {
    text-align: center;
  }
`;

// .checkout-item {

// }
