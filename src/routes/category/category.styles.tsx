import styled from "styled-components";

export const CategoryContainer = styled.div`
  h2 {
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

export const CategoryProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.5rem;
  row-gap: 4rem;
`;
