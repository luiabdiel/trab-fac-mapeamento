"use client";

import styled from "styled-components";

const Title = styled.h1`
  height: 80vh;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-direction: column;
  text-align: center;

  font-weight: 300;
  font-size: 24px;

  margin: 12px 24px;

  span {
    font-weight: 800;
    color: green;
  }

  @media (min-width: 968px) {
    font-size: 32px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export function Main() {
  return (
    <Title>
      Descarte Consciente: Cuide do Nosso <span>Planeta!</span>
    </Title>
  );
}
