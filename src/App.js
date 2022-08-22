import "./App.css";
import Navigation from "./components/Navigation";
import UsersForm from "./pages/UsersForm";
import { Redirect, Route, Switch } from "react-router-dom";
import AddNewUser from "./pages/AddNewUser";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function App() {
  const history = useHistory();

  let initialState;
  if (localStorage.getItem("user")) {
    initialState = true;
  } else {
    initialState = false;
  }

  const [isAuth, setIsAuth] = useState(initialState);

  const loginHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "isLogged");
    setIsAuth(true);
    history.replace("/users-form");
  };

  function logoutHandler() {
    localStorage.clear();
    setIsAuth(false);
    history.replace("/");
  }

  return (
    <>
      <header>
        <Navigation logout={logoutHandler} />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Login login={loginHandler} />
          </Route>
          <ProtectedRoute
            path="/users-form"
            exact
            component={UsersForm}
            auth={isAuth}
          />
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
