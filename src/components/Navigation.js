import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navigation(props) {
  const history = useHistory();

  function logoutHandler() {
    localStorage.clear();
    props.authLogout();
    history.replace("/login");
  }
  return (
    <Navbar expand="lg" bg="primary" variant="primary">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={({ isActive }) => (isActive ? void 0 : "/")}
        >
          My Users Project
        </NavLink>

        {localStorage.getItem("user") !== null && (
          <>
            <Nav>
              <Nav.Link href="/add-new-user" style={{ color: "#b9aeb3" }}>
                Add new user
              </Nav.Link>
              <Button variant="outline-light" onClick={logoutHandler}>
                Logout
              </Button>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
