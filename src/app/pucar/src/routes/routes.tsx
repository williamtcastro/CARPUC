import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Accounts from './account';

function Routes() {
  return (
    <BrowserRouter>
      {/* <Route path="/" exact component={Home} /> */}
      <Route path="/account" component={Accounts} />
    </BrowserRouter>
  );
}

export default Routes;
