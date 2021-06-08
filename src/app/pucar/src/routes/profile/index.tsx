import { Route, Switch, useRouteMatch } from "react-router-dom";

import ProfilePage from "../../pages/Profile/ProfilePage";
import Cars from '../cars/';

export default function Profile() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/`} component={ProfilePage} />
      <Route path={`${path}/cars`} component={Cars} />
    </Switch>
  );
}
