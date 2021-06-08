import { Route, Switch, useRouteMatch } from "react-router-dom";
import Carlist from "../../pages/Cars/Carlist";
import CreateCar from "../../pages/Cars/CreateCar";

export default function Cars() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/`} component={Carlist} />
      <Route exact path={`${path}/new`} component={CreateCar} />
    </Switch>
  );
}
