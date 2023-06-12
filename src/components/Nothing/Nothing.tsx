import React from "react";

import { styled } from "@mui/material/styles";
import { Link } from "@material-ui/core";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

type NothingProps = {
  setVisibleAddBook: (isVisibleAddBook: boolean) => void;
};

export const Nothing = ({ setVisibleAddBook }: NothingProps) => (
  <Div>
    <FolderOpenIcon sx={{ m: 1 }} />
    Nothing found. You can{" "}
    <StyledLink onClick={() => setVisibleAddBook(true)}>
      add books
    </StyledLink>{" "}
    by ISBN number.
  </Div>
);

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

const StyledLink = styled(Link)`
  cursor: pointer;
`;
