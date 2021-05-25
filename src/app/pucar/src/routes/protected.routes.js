import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/account", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
