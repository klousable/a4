import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Row, Col, Container } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Container>
      <h1 className="my-4">My Favourites</h1>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col key={objectID} lg={3} md={4}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-4">
          <p>Nothing Here. Try adding some new artwork to the list.</p>
        </div>
      )}
    </Container>
  );
}
