import React, { useState } from "react";
import { toast } from "react-toastify";

import { Modal } from "@material-ui/core";
import { Box, CardActions } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { fetchBooks, updateBook } from "../../Books/BooksSlice";

import { StyledButton } from "../../Button";

import { useAppDispatch } from "../../../app/hooks";

import { bookStatus } from "../../../utils/bookStatus";

interface ActionsUpdateProps {
  id: number;
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
  id,
  isVisibleModal,
  setIsVisibleModal,
}: ActionsUpdateProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    const response = await dispatch(updateBook({ status: Number(value), id }));
    setIsVisibleModal(false);
    setValue("");

    if (updateBook.fulfilled.match(response)) {
      toast(`Status changed to ${bookStatus({ status: Number(value) })}`);
      dispatch(fetchBooks());
    }
  };

  const handleCancel = () => {
    setIsVisibleModal(false);
    setValue("");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <StyledModal
      open={isVisibleModal}
      onClose={() => setIsVisibleModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEnforceFocus
    >
      <Box sx={boxStyle}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="demo-simple-select"
            value={value}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={0}>New</MenuItem>
            <MenuItem value={1}>Reading</MenuItem>
            <MenuItem value={2}>Finished</MenuItem>
          </Select>

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
              content="Submit"
            />
          </CardActions>
        </FormControl>
      </Box>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  backdrop-filter: blur(3px);
`;
