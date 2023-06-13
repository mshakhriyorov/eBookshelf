import * as React from "react";

import ContentLoader from "react-content-loader";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "styled-components";

export const Loader = ({ variant }: { variant: "skeleton" | "circular" }) => (
  <>
    {variant === "skeleton" ? (
      <Div>
        <ContentLoader
          speed={2}
          width={270}
          height={600}
          viewBox="0 0 270 600"
          backgroundColor="#e3e3e3"
          foregroundColor="#d7cbcb"
        >
          <rect x="5" y="27" rx="0" ry="0" width="262" height="185" />
          <rect x="5" y="225" rx="0" ry="0" width="261" height="58" />
          <rect x="6" y="294" rx="0" ry="0" width="258" height="35" />
          <rect x="6" y="337" rx="0" ry="0" width="258" height="35" />
          <rect x="7" y="380" rx="0" ry="0" width="125" height="42" />
          <rect x="139" y="380" rx="0" ry="0" width="125" height="42" />
        </ContentLoader>
        <ContentLoader
          speed={2}
          width={270}
          height={600}
          viewBox="0 0 270 600"
          backgroundColor="#e3e3e3"
          foregroundColor="#d7cbcb"
        >
          <rect x="5" y="27" rx="0" ry="0" width="262" height="185" />
          <rect x="5" y="225" rx="0" ry="0" width="261" height="58" />
          <rect x="6" y="294" rx="0" ry="0" width="258" height="35" />
          <rect x="6" y="337" rx="0" ry="0" width="258" height="35" />
          <rect x="7" y="380" rx="0" ry="0" width="125" height="42" />
          <rect x="139" y="380" rx="0" ry="0" width="125" height="42" />
        </ContentLoader>
        <ContentLoader
          speed={2}
          width={270}
          height={600}
          viewBox="0 0 270 600"
          backgroundColor="#e3e3e3"
          foregroundColor="#d7cbcb"
        >
          <rect x="5" y="27" rx="0" ry="0" width="262" height="185" />
          <rect x="5" y="225" rx="0" ry="0" width="261" height="58" />
          <rect x="6" y="294" rx="0" ry="0" width="258" height="35" />
          <rect x="6" y="337" rx="0" ry="0" width="258" height="35" />
          <rect x="7" y="380" rx="0" ry="0" width="125" height="42" />
          <rect x="139" y="380" rx="0" ry="0" width="125" height="42" />
        </ContentLoader>
      </Div>
    ) : (
      <Container>
        <CircularProgress />
      </Container>
    )}
  </>
);

const Div = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const Container = styled("div")`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: aliceblue;
  position: absolute;
  top: 0;
  left: 0;
`;
