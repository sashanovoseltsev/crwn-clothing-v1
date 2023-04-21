import styled from "styled-components";
import { css } from "styled-components";

export type CategoryImageProps = {
  url: string;
}

export const CategoryImage = styled.div<CategoryImageProps>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  ${(props) =>
    props.url &&
    css`
      background-image: url(${props.url});
    `}
`;

export const CategoryBody = styled.div`
  height: 9rem;
  padding: 0 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;

  h2 {
    font-weight: bold;
    margin: 0 0.6rem 0;
    font-size: 2.2rem;
    color: #4a4a4a;
    text-transform: uppercase;
  }

  p {
    font-weight: lighter;
    font-size: 1.6rem;
  }
`;

export const CategoryContainer = styled.div`
  min-width: 30%;
  height: 24rem;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid black;
  //margin: 0 7..5rem 1.5rem;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & ${CategoryImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${CategoryBody} {
      opacity: 0.9;
    }
  }
`;

// .category-container {
//   min-width: 30%;
//   height: 24.0rem;
//   flex: 1 1 auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid black;
//   //margin: 0 7.5px 15px;
//   overflow: hidden;

//   &:hover {
//     cursor: pointer;

//     & .background-image {
//       transform: scale(1.1);
//       transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
//     }

//     & .category-body-container {
//       opacity: 0.9;
//     }
//   }

//   &.large {
//     height: 380px;
//   }
//   }
// }
