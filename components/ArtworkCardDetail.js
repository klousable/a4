import useSWR from "swr";
import Error from "next/error";
import { Card } from "react-bootstrap";

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  // error state or no data
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  // default values
  const {
    primaryImage,
    title = "N/A",
    objectDate = "N/A",
    classification = "N/A",
    medium = "N/A",
    artistDisplayName = "N/A",
    artistWikidata_URL,
    creditLine = "N/A",
    dimensions = "N/A",
  } = data;

  return (
    <Card>
      {primaryImage && (
        <Card.Img variant="top" src={primaryImage} alt={title} />
      )}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate}
          <br />
          <strong>Classification:</strong> {classification}
          <br />
          <strong>Medium:</strong> {medium}
          <br />
          <br />
          <strong>Artist:</strong> {artistDisplayName}
          {artistDisplayName !== "N/A" && artistWikidata_URL && (
            <>
              {" "}
              (
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
              )
            </>
          )}
          <br />
          <strong>Credit Line:</strong> {creditLine}
          <br />
          <strong>Dimensions:</strong> {dimensions}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
