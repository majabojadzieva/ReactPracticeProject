import "./App.css";
import Navigation from "./components/Navigation";
import UsersForm from "./pages/UsersForm";
import { Route, Switch } from "react-router-dom";
import AddNewUser from "./pages/AddNewUser";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={UsersForm} />
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
