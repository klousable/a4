import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Update showAdded when favouritesList changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  // Handle favourites button click
  const favouritesClicked = async () => {
    try {
      if (showAdded) {
        // Remove from favourites
        setFavouritesList(await removeFromFavourites(objectID));
      } else {
        // Add to favourites
        setFavouritesList(await addToFavourites(objectID));
      }
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  // Handle error or no data
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  // Default values for artwork data
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
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
