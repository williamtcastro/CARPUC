import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Accounts from "./account";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/account" component={Accounts} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
