import { Route, Switch, useRouteMatch } from "react-router-dom";

import RidesList from "../../pages/Profile/RidesList";
import RidesDetail from "../../pages/Rides/RidesDetail";
import NewRides from "../../pages/Rides/NewRides";

export default function Rides() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/list`} component={RidesList} />
      <Route path={`${path}/new`} component={NewRides} />
      <Route exact path={`${path}/:id`} component={RidesDetail} />
    </Switch>
  );
}
