import styled from "styled-components";

import { productsGrid } from "../../global.styles";

export const CategoryPreviewContainer = styled.div`
  .category-container {
    ${productsGrid}
  }

  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

// .category-preview {
//   &__category-container {
//     @include products-grid();
//   }

//   &:not(:last-child) {
//     margin-bottom: 40px;
//   }
// }
