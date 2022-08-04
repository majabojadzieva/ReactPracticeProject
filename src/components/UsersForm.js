import React, { useEffect, useState, useContext } from "react";
import UserItem from "./UserItem";
import UsersContext from "../store/users-context";

function UsersForm() {
  // const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const usersCtx = useContext(UsersContext);

  // **************************GET DATA********************************
  async function getUsers() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      usersCtx.users.push(...data);

      // setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // ******************************DELETE DATA*******************************

  async function deleteUserHandler(id) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/" + id,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      usersCtx.users = usersCtx.users.filter((user) => user.id !== id);
      // setUsers(updatedUsersList);
      alert("User deleted!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  // ******************************CONTENT****************************

  let content = <h5 className="text-center">Loading...</h5>;

  if (!isLoading && !error) {
    content = (
      <div className=".container m-0-1 m-sm-3 m-md-5">
        <div className="row justify-content-around">
          {usersCtx.users.map((user) => {
            return (
              <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                avataru={user.avataru}
                date={user.createdAt}
                deleteUser={() => {
                  deleteUserHandler(user.id);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (!isLoading && error) {
    content = <h5 className="text-center">{error}</h5>;
  }

  // ***************************RETURN***************************

  return <>{content}</>;
}

export default UsersForm;
