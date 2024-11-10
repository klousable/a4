import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";

const PER_PAGE = 12;

export default function Artwork() {
  // page default to 1 and artworklist no state
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  // query string from the router
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  // swr with query
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  // pagination
  const previousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage((prev) => prev + 1);
  };

  // use effect hook
  useEffect(() => {
    if (data && data.objectIDs) {
      const results = [];
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  // error or no data
  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  // ternary if artwork list length is 0
  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
