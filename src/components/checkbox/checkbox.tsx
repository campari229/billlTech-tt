import React from "react";
import styled from "styled-components";
import IconCheck from "../../icons/IconCheck";
import { baseTheme } from "../../styles/theme";

type Props = {
  labelText: string;
  handler: (transfer: 0 | 1 | 2 | 3 | null, add: boolean) => void;
  checked?: boolean;
  name: string;
};

const Checkbox = ({ labelText, checked, name, handler }: Props) => {
  return (
    <CheckboxLabel>
      <StyledCheckbox>
        {checked && (
          <IconCheck
            width={12}
            height={8}
            color={baseTheme.colors.mainColorBlue}
          />
        )}
      </StyledCheckbox>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => {
          const eventNumber = Number(e.target.name);
          if (
            eventNumber === 0 ||
            eventNumber === 1 ||
            eventNumber === 2 ||
            eventNumber === 3
          ) {
            handler(eventNumber, !checked);
          } else {
            handler(null, !checked);
          }
        }}
        style={{ position: "absolute", zIndex: -1, opacity: 0 }}
      />
      {labelText}
    </CheckboxLabel>
  );
};

const CheckboxLabel = styled.label`
  width: 100%;
  display: flex;
  font-size: ${({ theme }) => theme.text.checkBoxSize};
  line-height: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.mainText};
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.colorCheckBoxHover};
  }
  transition: ${({ theme }) => theme.durations.transition};
`;

const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.mainColorBlue};
  border-radius: 2px;
  margin-right: 12px;
`;

export default Checkbox;
