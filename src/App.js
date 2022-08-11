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
          <Route path="/users-list" component={UsersForm} />
          <Route path="/add-new-user" component={AddNewUser} />
        </Switch>
      </main>
    </>
  );
}

export default App;
