import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";

export default function NavBar() {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NextLink href={"/"}>
                <Button variant="contained">HomePage</Button>
              </NextLink>
            </Typography>

            <NextLink href={"/login"}>
              <Button
                variant="contained"
                sx={{
                  mr: 1,
                }}
              >
                Login
              </Button>
            </NextLink>
            <NextLink href={"/register"}>
              <Button variant="contained">Register</Button>
            </NextLink>
          </Toolbar>
        </AppBar>
      </>
    );
  } else {
    body = (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NextLink href={"/"}>
                <Button variant="contained">HomePage</Button>
              </NextLink>

              <NextLink href={"/create-post"}>
                <Button variant="contained" sx={{ ml: 1 }}>
                  Create Post
                </Button>
              </NextLink>
            </Typography>
            <Typography
              color="inherit"
              sx={{
                mr: 1,
              }}
            >
              Hello {data.me.username}
            </Typography>

            <Button
              variant="contained"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </>
    );
  }
  return <Box sx={{ flexGrow: 1 }}>{body}</Box>;
}
