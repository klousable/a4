import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";

export default function Login(props) {
  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Use atoms to update favourites and search history
  const [_, setFavourites] = useAtom(favouritesAtom);
  const [__, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    console.log("updateAtoms is being called in Login"); // Log when the function is triggered
    try {
      const [favourites, searchHistory] = await Promise.all([
        getFavourites(),
        getHistory(),
      ]);

      // Log the actual arrays
      console.log("Favourites:", favourites.favourites); 
      console.log("Search History:", searchHistory.history); 
      setFavourites(favourites.favourites); 
      setSearchHistory(searchHistory.history); 
    } catch (err) {
      console.error("Error updating atoms:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <br />
      <Card bg="dark">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
