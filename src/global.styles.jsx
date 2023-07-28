import { createGlobalStyle, css } from "styled-components";
import { CategoryContainer, CategoryShopNowLink } from './components/category-item/category-item.styles';
import { ProductContainer } from './components/product/product.styles';
import { CategoryPreviewContainer } from './components/category-preview/category-preview.styles';
import { CategoryProducts } from './routes/category/category.styles';
import { AuthenticationContainer } from './components/authentication/authentication.styles';
import { LinkContainer } from './routes/navigation/navigation.styles';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 2rem 4rem;
    font-family: "Open Sans", sans-serif;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  @media screen and (max-width: 800px) {
    ${CategoryContainer} {
      height: 200px;
    }

    html {
      font-size: 50%;
    }

    ${ProductContainer} {
      height: 30rem;
      .img {
        object-fit: cover;
      }

      button {
        display: flex;
        opacity: 1;

        &:hover,
        &:active {
          background-color: white;
          color: #333;
          border-color: #333;
        }
      }
    }

    ${CategoryProducts},
    ${CategoryPreviewContainer} .category-container {
      grid-template-columns: repeat(2, 1fr);
    }

    ${AuthenticationContainer} {
      flex-direction: column;
      align-items: center;
      row-gap: 3rem;
    }

    ${LinkContainer} {
      width: 70%;
    }
  }

  @media screen and (max-width: 460px) {
    html {
      font-size: 40%;
    }

    ${CategoryShopNowLink} {
      padding: 0 2rem;
    }

    ${CategoryProducts},
    ${CategoryPreviewContainer} .category-container {
      grid-template-columns: 1fr;
    }
  }
`;