import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type DialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
};

export const StyledDialog = ({ onSubmit, isOpen, setIsOpen }: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="responsive-dialog-title"
      sx={{ backdropFilter: "blur(2px)" }}
    >
      <DialogTitle id="responsive-dialog-title">
        Once you logged out, you will lose access to your account. <br /> Do you
        really want it?
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={() => setIsOpen(false)}>
          Disagree
        </Button>
        <Button onClick={handleSubmit} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
