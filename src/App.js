import "./App.css";
import Navigation from "./components/Navigation";
import UsersForm from "./pages/UsersForm";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import AddNewUser from "./pages/AddNewUser";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  const history = useHistory();

  // **********************************AUTH STATE*************************

  let initialState;
  if (localStorage.getItem("user")) {
    initialState = true;
  } else {
    initialState = false;
  }

  const [isAuth, setIsAuth] = useState(initialState);

  // **********************************LOGIN STATE*************************

  const [enteredLoginData, setEnteredLoginData] = useState({
    email: "",
    password: "",
  });

  const [wrongDataMessage, setWrongDataMessage] = useState({
    email: null,
    password: null,
  });

  // **********************************ONCHANGE HANDLERS********************

  const enteredEmailHandler = (e) => {
    setEnteredLoginData({
      email: e.target.value,
      password: enteredLoginData.password,
    });
  };

  const enteredPassHandler = (e) => {
    setEnteredLoginData({
      email: enteredLoginData.email,
      password: e.target.value,
    });
  };

  // **********************************LOGIN HANDLER************************

  const loginHandler = (e) => {
    e.preventDefault();

    if (
      enteredLoginData.email !== "test@test.com" &&
      enteredLoginData.password === "Test1234!"
    ) {
      setWrongDataMessage({ email: true, password: false });
    }

    if (
      enteredLoginData.email === "test@test.com" &&
      enteredLoginData.password !== "Test1234!"
    ) {
      setWrongDataMessage({ email: false, password: true });
    }

    if (
      enteredLoginData.email !== "test@test.com" &&
      enteredLoginData.password !== "Test1234!"
    ) {
      setWrongDataMessage({ email: false, password: false });
    }

    if (
      enteredLoginData.email === "test@test.com" &&
      enteredLoginData.password === "Test1234!"
    ) {
      localStorage.setItem("user", "isLogged");
      setIsAuth(true);
      history.replace("/");
      setWrongDataMessage({
        email: null,
        password: null,
      });
    }
  };

  // **********************************LOGOUT HANDLER*************************

  function logoutHandler() {
    localStorage.clear();
    setIsAuth(false);
    history.replace("/login");
  }

  // **********************************RETURN**********************************

  return (
    <>
      <header>
        <Navigation logout={logoutHandler} />
      </header>
      <main>
        <Switch>
          <ProtectedRoute
            path="/login"
            exact
            authLogin={isAuth}
            component={Login}
            login={loginHandler}
            enteredEmailData={enteredEmailHandler}
            enteredPassData={enteredPassHandler}
            alert={wrongDataMessage}
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
