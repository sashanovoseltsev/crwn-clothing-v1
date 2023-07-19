import { Link } from "react-router-dom";
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

export const CategoryShopNowLink = styled(Link)`
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

  &:link,
  &:visited {
    text-decoration: none;
    color: #4a4a4a;
  }

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
  overflow: hidden;

  &:hover {

    & ${CategoryImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${CategoryShopNowLink} {
      opacity: 0.9;
    }
  }
`;
