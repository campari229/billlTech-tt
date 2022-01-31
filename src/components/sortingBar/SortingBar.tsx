import React from "react";

import styled from "styled-components";

type Props = {
  handler: (sortType: "cheap" | "fast") => void;
  sortType: "cheap" | "fast" | null;
};

const SortingBar = ({ handler, sortType }: Props) => {
  return (
    <SortingBarWrapper>
      <SortingBarButton
        isActive={sortType === "cheap"}
        onClick={() => handler("cheap")}
      >
        Самый Дешевый
      </SortingBarButton>
      <SortingBarButton
        isActive={sortType === "fast"}
        onClick={() => handler("fast")}
      >
        Самый Быстрый
      </SortingBarButton>
    </SortingBarWrapper>
  );
};

const SortingBarWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-bottom: 18px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  overflow: hidden;
`;

interface SortingBarButtonProps {
  isActive: boolean;
}

const SortingBarButton = styled.button<SortingBarButtonProps>`
  flex: 0 1 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  font-size: ${({ theme }) => theme.text.mainTextSize};
  font-weight: 600;
  &:last-child {
    border-radius: ${({ theme }) =>
      `0 ${theme.sizes.borderRadius} ${theme.sizes.borderRadius} 0`};
  }
  &:first-child {
    border-radius: ${({ theme }) =>
      `${theme.sizes.borderRadius} 0 0 ${theme.sizes.borderRadius}`};
  }
  border: ${({ theme, isActive }) =>
    isActive ? "none" : `1px solid ${theme.colors.colorBorderGray}`};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.textWhite : theme.colors.mainText};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.mainColorBlue : theme.colors.textWhite};
`;

export default SortingBar;
