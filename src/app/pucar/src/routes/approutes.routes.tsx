import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import RidesDetail from "../pages/Rides/RidesDetail";

export default function AppRoutes() {

  return (
    <Switch>
      <Route exact path={`/`} component={Home} />
      <Route path={`/rides/:id`} component={RidesDetail} />
    </Switch>
  );
}
