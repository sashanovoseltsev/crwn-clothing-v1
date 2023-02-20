import styled from "styled-components";
import { productsGrid } from "../../global.styles";

export const CategoryContainer = styled.div`
  h2 {
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

export const CategoryProducts = styled.div`
  ${productsGrid}
`;
