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
  const [isAuth, setIsAuth] = useState();

  const loginHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("user", isAuth);
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
          <ProtectedRoute path="/users-form" exact component={UsersForm} />
          <ProtectedRoute path="/add-new-user" exact component={AddNewUser} />
          <Route path="*" exact>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
