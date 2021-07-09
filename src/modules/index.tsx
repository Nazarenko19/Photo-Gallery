import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Header from "components/sections/Header";
// import SignUp from "components/pages/SignUp";
// import SignIn from "components/pages/SignIn";
// import ForgotPassword from "./components/pages/ForgotPassword";
// import Homepage from "./components/pages/Homepage";
// import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";
// import Loader from "./components/UI/Loader";
import firebase from "firebase/config";
import { defaultRoute, publicRoutes, privateRoutes } from "routes/routes-list";
import { getUserById, setLoading, setNeedVerification } from "store/modules/auth/actions";
import { RootState } from "store";

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
    return <div>loading</div>;
  }

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        {/* <Route path={defaultRoute} component={Homepage} exact /> */}
        {/* <PublicRoute path={publicRoutes.signUp} component={SignUp} exact /> */}
        {/* <PublicRoute path={publicRoutes.forgotPassword} component={SignIn} exact /> */}
        {/* <PublicRoute path={publicRoutes.forgotPassword} component={ForgotPassword} exact /> */}
        {/* <PrivateRoute path={privateRoutes.dashboard} component={Dashboard} exact /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Content;
