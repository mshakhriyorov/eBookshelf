import React, { useState } from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { removeBook } from "../BooksSlice";

import { ActionsUpdate } from "../../Actions/Update";
import { StyledDialog } from "../../Dialog";

import { bookStatus } from "../../../utils/bookStatus";

import { BookData } from "../constants/booksInterfaces";

import { useAppDispatch } from "../../../app/hooks";

const authorStyle = {
  position: "absolute",
  bottom: 0,
  left: 16,
  width: "100%",
  background: "rgb(73 68 77 / 35%)",
  backdropFilter: "blur(5px)",
  padding: 1,
  fontSize: 14,
  color: "#fff",
};

export const BooksItem = ({
  id,
  author,
  title,
  isbn,
  published,
  status,
  pages,
  cover,
}: BookData) => {
  const dispatch = useAppDispatch();
  const [visibleDeleteBook, setVisibleDeleteBook] = useState(false);
  const [visibleUpdateBook, setVisibleUpdateBook] = useState(false);

  const handleDeleteBook = () => {
    dispatch(removeBook({ id }));
  };

  return (
    <>
      <StyledCard>
        <span style={{ position: "relative" }}>
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "70%",
            }}
            image={cover}
          />
          <Typography gutterBottom variant="h6" component="h2" sx={authorStyle}>
            Author: {author}
          </Typography>
        </span>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <StyledTitle gutterBottom variant="h5" title={title}>
            {title}
          </StyledTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Item>ISBN: {isbn}</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>Published at {published}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Pages: {pages}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Status: {bookStatus({ status })}</Item>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setVisibleDeleteBook(true)}>
            Delete
          </Button>
          <Button size="small" onClick={() => setVisibleUpdateBook(true)}>
            Edit
          </Button>
        </CardActions>
      </StyledCard>

      {visibleUpdateBook && (
        <ActionsUpdate
          id={id}
          isVisibleModal={visibleUpdateBook}
          setIsVisibleModal={setVisibleUpdateBook}
        />
      )}

      {visibleDeleteBook && (
        <StyledDialog
          variant="book"
          isOpen={visibleDeleteBook}
          setIsOpen={setVisibleDeleteBook}
          onSubmit={handleDeleteBook}
        />
      )}
    </>
  );
};

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.3s all;

  &:hover {
    transform: scale(1.005);
  }
`;

const StyledTitle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
