"use client";

import styled from "styled-components";

const TagHeader = styled.header`
  background-color: black;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 100px;
`;

const Logo = styled.a`
  color: white;
  font-weight: 900;
  font-size: 20px;

  text-decoration: none;
`;

const Menu = styled.ul`
  list-style: none;

  li {
    a {
      text-decoration: none;
      font-weight: 500;
      color: white;

      margin-right: 16px;
    }
  }
`;

export function Header() {
  return (
    <TagHeader>
      <Logo href="/">EcoL</Logo>
      <Menu>
        <li>
          <a href="/">Início</a>
          <a href="/map">Mapa</a>
        </li>
      </Menu>
    </TagHeader>
  );
}
