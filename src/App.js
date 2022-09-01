import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Login } from "./pages/Login";
import UsersForm from "./pages/UsersForm";
import AddNewUser from "./pages/AddNewUser";
import Navigation from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    let initialState;
    if (localStorage.getItem("user")) {
      initialState = true;
    } else {
      initialState = false;
    }
    setIsAuth(initialState);
  }, []);

  return (
    <>
      <header>
        <Navigation
          authLogout={() => {
            setIsAuth(false);
          }}
        />
      </header>
      <main>
        <Switch>
          <ProtectedRoute
            path="/login"
            exact
            authLogin={isAuth}
            component={Login}
            setIsAuth={setIsAuth}
          />

          <ProtectedRoute path="/" exact component={UsersForm} auth={isAuth} />
          <ProtectedRoute
            path="/add-new-user"
            exact
            component={AddNewUser}
            auth={isAuth}
          />
          <Route path="*" exact>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
