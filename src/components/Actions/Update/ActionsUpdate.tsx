import React, { useState } from "react";
import clsx from "clsx";

import { Modal } from "@material-ui/core";
import { Box, Typography, CardActions } from "@mui/material";
import FormControl, { useFormControlContext } from "@mui/base/FormControl";
import Input, { inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";

import { StyledButton } from "../../Button";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateBook } from "../../Books/BooksSlice";

interface ActionsUpdateProps {
  isVisibleModal: boolean;
  setIsVisibleModal: (isVisibleModal: boolean) => void;
}

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export const ActionsUpdate = ({
  isVisibleModal,
  setIsVisibleModal,
}: ActionsUpdateProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const { bookId } = useAppSelector((state) => state.books);

  const handleSubmit = () => {
    dispatch(updateBook({ status: Number(value), id: 2 }));
    setIsVisibleModal(false);
    setValue("");
  };

  const handleCancel = () => {
    setIsVisibleModal(false);
    setValue("");
  };

  return (
    <StyledModal
      open={isVisibleModal}
      onClose={() => setIsVisibleModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Typography variant="h6">Update status of the book</Typography>
        <FormControl
          defaultValue={bookId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        >
          <Label>Status</Label>
          <StyledInput type="number" />
          <HelperText />

          <CardActions
            sx={{ display: "flex", mt: 1, p: 0, justifyContent: "center" }}
          >
            <StyledButton
              type="cancel"
              onClick={handleCancel}
              content="Cancel"
            />
            <StyledButton
              type="submit"
              onClick={handleSubmit}
              content="Update"
            />
          </CardActions>
        </FormControl>
      </Box>
    </StyledModal>
  );
};

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledModal = styled(Modal)`
  backdrop-filter: blur(3px);
`;

const StyledInput = styled(Input)(
  ({ theme }) => `
    
    .${inputClasses.input} {
      width: 320px;
      font-size: 0.875rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 400;
      line-height: 1.5;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[300]
      };
      border-radius: 8px;
      padding: 12px 12px;
  
      &:hover {
        background: ${theme.palette.mode === "dark" ? "" : grey[100]};
        border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
      }
  
      &:focus {
        outline: 3px solid ${
          theme.palette.mode === "dark" ? blue[600] : blue[100]
        };
      }
    }
  `
);

const Label = styled(
  ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p
        className={clsx(className, error || showRequiredError ? "invalid" : "")}
      >
        {children}
        {required ? " *" : ""}
      </p>
    );
  }
)`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
