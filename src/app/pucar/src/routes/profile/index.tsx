import { Route, Switch, useRouteMatch } from "react-router-dom";

import ProfilePage from "../../pages/Profile/ProfilePage";

export default function Profile() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/`} component={ProfilePage} />
      {/* <Route path={`${path}/car/new`} component={RidesList} /> */}
    </Switch>
  );
}
