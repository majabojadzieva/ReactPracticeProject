import "./App.css";
import Navigation from "./components/Navigation";
import UsersForm from "./components/UsersForm";
import { Redirect, Route, Switch } from "react-router-dom";
import AddNewUser from "./components/AddNewUser";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/users-list" />
          </Route>
          <Route path="/users-list">
            <UsersForm />
          </Route>
          <Route path="/add-new-user">
            <AddNewUser />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
