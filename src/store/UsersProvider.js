import UsersContext from "./users-context";

function UsersProvider(props) {
  const initialState = { users: [] };

  return (
    <UsersContext.Provider value={initialState}>
      {props.children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
