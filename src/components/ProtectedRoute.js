import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({
  authLogin,
  auth,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === true) {
          return <Component {...props} />;
        }
        if (auth === false) {
          return <Redirect to="/login" />;
        }
        if (authLogin === true) {
          return <Redirect to="/" />;
        }
        if (authLogin === false) {
          return <Component {...props} {...rest} />;
        }
      }}
    />
  );
};
