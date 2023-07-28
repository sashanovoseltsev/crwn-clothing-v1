import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  .category-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1.5rem;
    row-gap: 4rem;
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
