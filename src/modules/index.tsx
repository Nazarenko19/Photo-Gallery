import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { getUserById, setLoading, setNeedVerification } from "store/modules/auth/actions";
import { defaultRoute, publicRoutes, privateRoutes } from "routes/routes-list";
import { RootState } from "store";

import firebase from "firebase/config";

import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
import Loader from "components/Loader";

const SignUp = React.lazy(() => import("modules/SignUp"));
const SignIn = React.lazy(() => import("modules/SignIn"));
const ForgotPassword = React.lazy(() => import("modules/ForgotPassword"));
const Homepage = React.lazy(() => import("modules/Homepage"));
const Dashboard = React.lazy(() => import("modules/Dashboard"));
const PageNotFound = React.lazy(() => import("modules/PageNotFound"));

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={defaultRoute} component={Homepage} exact />
        <PublicRoute path={publicRoutes.signUp} component={SignUp} exact />
        <PublicRoute path={publicRoutes.signIn} component={SignIn} exact />
        <PublicRoute path={publicRoutes.forgotPassword} component={ForgotPassword} exact />
        <PublicRoute path={publicRoutes.pageNotFound} component={PageNotFound} exact />
        <PrivateRoute path={privateRoutes.dashboard} component={Dashboard} exact />
        <Redirect to={publicRoutes.pageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Content;
