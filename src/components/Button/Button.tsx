import React from "react";

import Button, { buttonClasses, ButtonTypeMap } from "@mui/base/Button";
import { PolymorphicComponent } from "@mui/base/utils";
import { styled } from "@mui/system";

interface ButtonProps {
  onClick: () => void;
  type: "submit" | "cancel";
  content: string;
}

export const StyledButton = ({ onClick, type, content }: ButtonProps) =>
  type === "submit" ? (
    <CustomSubmitButton slots={{ root: "span" }} onClick={onClick}>
      {content}
    </CustomSubmitButton>
  ) : (
    <CustomCancelButton slots={{ root: "span" }} onClick={onClick}>
      {content}
    </CustomCancelButton>
  );

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const red = {
  500: "#fc2803",
  600: "#e32f10",
  700: "#c4270c",
};

const CustomSubmitButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[600]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
` as PolymorphicComponent<ButtonTypeMap>;

const CustomCancelButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color:  ${red[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${red[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${red[700]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
` as PolymorphicComponent<ButtonTypeMap>;
