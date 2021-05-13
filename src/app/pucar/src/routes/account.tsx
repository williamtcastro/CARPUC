import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Login from '../pages/Login';
import Logon from '../pages/Logon';

export default function Account() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/logon`} component={Logon} />
      {/* <Route path={`${path}/forgot`} component={SignIn} /> */}
    </Switch>
  );
}
