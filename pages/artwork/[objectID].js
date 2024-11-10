import { useRouter } from "next/router"; // Import the useRouter hook
import { Row, Col } from "react-bootstrap"; // Import Bootstrap components
import ArtworkCardDetail from "@/components/ArtworkCardDetail"; // Import the ArtworkCardDetail component

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Row>
      <Col>
        {objectID ? (
          <ArtworkCardDetail objectID={objectID} />
        ) : (
          <p>Loading...</p>
        )}
      </Col>
    </Row>
  );
}
