import React, { FC, useState, useEffect, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { Link } from "react-router-dom";
import { publicRoutes, defaultRoute } from "routes/routes-list";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { withStyles, Grid, Toolbar, AppBar, Button } from "@material-ui/core";
import headerStyles from "./styles";
import { signOut, setError } from "store/modules/auth/actions";

const Header: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(""));
    }
    setLoading(true);
    dispatch(signOut());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
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

              <Button disabled={loading} color="inherit" onClick={submitHandler}>
                Sign Out
              </Button>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(headerStyles)(Header);
