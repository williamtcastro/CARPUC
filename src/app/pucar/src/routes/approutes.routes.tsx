import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Rides from "./rides";
import Profile from "./profile";

export default function AppRoutes() {

  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route path={`/rides`} component={Rides} />
      <Route path={`/profile`} component={Profile} />
    </Switch>
  );
}
