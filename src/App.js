import "./App.css";
import UsersForm from "./components/UsersForm";
import UsersProvider from "./store/UsersProvider";

function App() {
  return (
    <UsersProvider>
      <header>
        <h1>List of Users</h1>
      </header>
      <UsersForm />
    </UsersProvider>
  );
}

export default App;
