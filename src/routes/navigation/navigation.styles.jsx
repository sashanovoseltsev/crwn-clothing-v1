import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  &:link,
  &:visited,
  button {
    border: none;
    display: inline-block;
    background-color: transparent;
    font-family: inherit;
    text-transform: uppercase;
    font-size: 1.6rem;

    text-decoration: none;
    color: #333;
    padding: 10px 15px;
    cursor: pointer;
    transition: all 0.2s;
  }

  &:hover,
  &:active,
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(#000, 0.2);
    background-color: #333;
    color: #fff;
  }
`;
