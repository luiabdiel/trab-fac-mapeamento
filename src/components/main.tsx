"use client";

import styled from "styled-components";

const Title = styled.h1`
  height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 300;

  span {
    font-weight: 800;
    margin-left: 10px;
    color: green;
  }
`;

export function Main() {
  return (
    <Title>
      Descarte Consciente: Cuide do Nosso <span>Planeta</span>!
    </Title>
  );
}
