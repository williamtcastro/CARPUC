import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Rides from "./rides";

export default function AppRoutes() {

  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route path={`/rides`} component={Rides} />
    </Switch>
  );
}
