import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getAuthSelector } from "../reducers/auth.slice";

import Accounts from "./account.routes";
import AppRoutes from "./approutes.routes";
import ProtectedRoute from "./protected.routes.js";

function Routes() {
  const auth = useSelector(getAuthSelector);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/account" component={Accounts} />
        <ProtectedRoute path="/" component={AppRoutes} isAuth={auth.authStatus} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
