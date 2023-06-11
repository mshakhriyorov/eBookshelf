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

import {
  deleteAccount,
  fetchMe,
  selectorGetMyself,
} from "../Register/UserSlice";

import { routePaths } from "../../utils/routePaths";
import { StyledDialog } from "../Dialog";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme();

export const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [visibleAddBook, setVisibleAddBook] = useState(false);
  const [visibleDeleteAccount, setVisibleDeletedAccount] = useState(false);
  const { registrationData, isRegistered } = useAppSelector(selectorGetMyself);
  const localStorageState =
    JSON.parse(localStorage.getItem("register") as any) || registrationData;

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    navigate(routePaths.register());
  };

  // fetch current user data
  useEffect(() => {
    if (localStorageState) {
      dispatch(fetchMe());
    }
  }, []);

  //   redirect in case already registered
  useEffect(() => {
    setTimeout(() => {
      if (!localStorageState.id && !isRegistered) {
        navigate(routePaths.register());
      }
    }, 2000);
  }, [navigate, localStorageState, isRegistered]);

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
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <BooksItem />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>

      {visibleAddBook && (
        <ActionsAdd
          isVisibleModal={visibleAddBook}
          setIsVisibleModal={setVisibleAddBook}
        />
      )}

      {visibleDeleteAccount && (
        <StyledDialog
          isOpen={visibleDeleteAccount}
          setIsOpen={setVisibleDeletedAccount}
          onSubmit={handleDeleteAccount}
        />
      )}
    </>
  );
};
