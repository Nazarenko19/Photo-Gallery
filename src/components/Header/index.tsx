import React, { FC } from "react";
import { Link } from "react-router-dom";
import { publicRoutes, defaultRoute } from "routes/routes-list";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { withStyles, Grid, Toolbar, AppBar, Button } from "@material-ui/core";
import headerStyles from "./styles";

const Header: FC = () => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Link to={defaultRoute}>
            <PhotoLibraryIcon />
          </Link>
          <div>
            <Link to={publicRoutes.signUp}>
              <Button color="inherit">Sign up</Button>
            </Link>
            <Link to={publicRoutes.signIn}>
              <Button color="inherit">Sign in</Button>
            </Link>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(headerStyles)(Header);
