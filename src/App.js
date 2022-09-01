import "./App.css";
import Navigation from "./components/Navigation";
import UsersForm from "./pages/UsersForm";
import { Redirect, Route, Switch } from "react-router-dom";
import AddNewUser from "./pages/AddNewUser";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  let initialState;
  if (localStorage.getItem("user")) {
    initialState = true;
  } else {
    initialState = false;
  }

  const [isAuth, setIsAuth] = useState(initialState);

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
