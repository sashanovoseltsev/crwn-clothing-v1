import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 1000px;
  margin: 30px auto;

  .header {
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    font-size: 20px;
    font-weight: 600;
    column-gap: 10px;
  }

  .header-item {
    justify-self: center;
  }

  .footer {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .total {
    font-size: 35px;
  }
`;
