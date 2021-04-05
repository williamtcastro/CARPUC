import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from '../pages/Login';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
    </BrowserRouter>
  );
}

export default Routes;
