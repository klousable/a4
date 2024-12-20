import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "../lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = readToken();
    setToken(storedToken);
  }, [router.pathname]);

  useEffect(() => {
    console.log("Token state changed:", token);
  }, [token]);

  const logout = () => {
    removeToken();
    setToken(null);
    router.push("/login");
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const updatedHistory = await addToHistory(`title=true&q=${searchField}`);
    setSearchHistory(updatedHistory);
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleNavClick = () => setIsExpanded(false);

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-primary"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand as={Link} href="/">
            Carrie Leung
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={handleNavClick}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={handleNavClick}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token ? (
              <>
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button variant="outline-light" type="submit">
                    Search
                  </Button>
                </Form>
                <Nav>
                  <NavDropdown
                    title={token?.userName || "User Name"}
                    id="user-dropdown"
                  >
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/favourites"}
                        onClick={handleNavClick}
                      >
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item
                        active={router.pathname === "/history"}
                        onClick={handleNavClick}
                      >
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              // If not logged in, show login/register links
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={handleNavClick}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={handleNavClick}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
