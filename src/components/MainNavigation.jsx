import { Navbar, Nav, Container } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const MainNavigation = (props) => {
    const isLogin = useSelector(state=>state.auth.isLoggedIn)

     
  let url;
  if (isLogin === null) {
    url = "/signup";
  } else {
    url = "/login";
  }
  return (
    <header>
      <Navbar sticky="top" className="bg-primary" variant="primary">
        <Container>
          <Nav className="navbar navbar-primary bg-primary">
            <NavLink
              className="me-3"
              to="/signup"
              style={({ isActive }) =>
                isActive ? { color: "black" } : { color: "yellow" }
              }
            >
              Signup
            </NavLink>
            <NavLink
              className="me-3"
              to={url}
              style={({ isActive }) =>
                isActive ? { color: "black" } : { color: "yellow" }
              }
            >
              Login
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainNavigation;
