import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";

import { ActionsAdd } from "../Actions/Add";
import { BooksItem } from "./Item";
import { Loader } from "../Loader";
import { Nothing } from "../Nothing";
import { StyledDialog } from "../Dialog";

import {
  deleteAccount,
  fetchMe,
  selectorGetMyself,
} from "../Register/UserSlice";
import { fetchBooks, selectorGetBooks, setInitialState } from "./BooksSlice";

import { routePaths } from "../../utils/routePaths";

const defaultTheme = createTheme();

export const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [visibleAddBook, setVisibleAddBook] = useState(false);
  const [visibleDeleteAccount, setVisibleDeletedAccount] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const { registrationData, isRegistered } = useAppSelector(selectorGetMyself);
  const { books, loading } = useAppSelector(selectorGetBooks);
  const localStorageState =
    JSON.parse(localStorage.getItem("register") as any) || registrationData;

  const bookItemsContent =
    books?.length > 0 ? (
      books.map(
        ({ book, status }, index) =>
          book?.author &&
          book?.title && (
            <Grid item key={`${book?.id}__${index}`} xs={12} sm={6} md={4}>
              <BooksItem
                id={book?.id}
                author={book?.author}
                title={book?.title}
                isbn={book?.isbn}
                published={book?.published}
                status={status || 0}
                pages={book?.pages}
                cover={book?.cover}
              />
            </Grid>
          )
      )
    ) : (
      <Nothing setVisibleAddBook={setVisibleAddBook} />
    );

  const handleDeleteAccount = () => {
    dispatch(setInitialState());
    dispatch(deleteAccount());
    navigate(routePaths.signup());
  };

  // fetch current user and books
  useEffect(() => {
    dispatch(fetchMe());
    dispatch(fetchBooks());
  }, [dispatch]);

  // redirect in case not registered
  useEffect(() => {
    setTimeout(() => {
      if (!localStorageState.id && !isRegistered) {
        navigate(routePaths.signup());
      }
    }, 2000);
  }, [navigate, localStorageState, isRegistered]);

  useEffect(() => {
    // Simulate async operation on component mount
    simulateAsyncOperation(2000);
  }, []);

  const simulateAsyncOperation = (delay: number) => {
    setMainLoader(true);

    setTimeout(() => {
      setMainLoader(false);
    }, delay);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <MenuBookIcon />
              eBookshelf
            </Typography>

            <Typography
              variant="h6"
              onClick={() => setVisibleAddBook(true)}
              sx={{ cursor: "pointer" }}
            >
              Add a new book
            </Typography>
            <Typography
              variant="h6"
              onClick={() => setVisibleDeletedAccount(true)}
              sx={{ color: "red", cursor: "pointer" }}
            >
              Logout
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {loading === "pending" ? (
                <Loader variant="skeleton" />
              ) : (
                bookItemsContent
              )}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>

      {mainLoader && <Loader variant="circular" />}

      {visibleAddBook && (
        <ActionsAdd
          isVisibleModal={visibleAddBook}
          setIsVisibleModal={setVisibleAddBook}
        />
      )}

      {visibleDeleteAccount && (
        <StyledDialog
          variant="account"
          isOpen={visibleDeleteAccount}
          setIsOpen={setVisibleDeletedAccount}
          onSubmit={handleDeleteAccount}
        />
      )}
    </>
  );
};
