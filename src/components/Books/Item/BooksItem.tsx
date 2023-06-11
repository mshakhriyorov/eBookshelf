import React from "react";
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

type Props = {};

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const BooksItem: React.FC = (props: Props) => {
  const author = "Konan Doyle";
  const title = "Raspberry Pi User Guide";
  const isbn = "325345346436346";
  const published = 2012;
  const status = 2;
  const pages = 300;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <span className="books-item__card-media" style={{ position: "relative" }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "70%",
          }}
          image="https://source.unsplash.com/random?wallpapers"
        />
        <Typography gutterBottom variant="h6" component="h2" sx={authorStyle}>
          Author: {author}
        </Typography>
      </span>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            <Item>Status: {status}</Item>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
};
