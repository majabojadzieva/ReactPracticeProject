import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth) return <Redirect to="/" />;
      }}
    />
  );
};
