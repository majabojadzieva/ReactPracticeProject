import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
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
              <Nav.Link href="/add-new-user">Add new user</Nav.Link>
              <Button variant="outline-light" onClick={props.logout}>
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
