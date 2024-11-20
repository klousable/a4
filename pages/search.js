import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store"; // Import the search history atom

export default function AdvancedSearch() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Access and update search history atom

  // Function to handle form submission
  const submitForm = (data) => {
    // Ensure searchBy is set correctly before appending it
    let queryString = `${data.searchBy}=true`; // Append 'searchBy' dynamically
    // Conditionally add other query parameters based on user input
    if (data.geoLocation) {
      queryString += `&geoLocation=${data.geoLocation}`;
    }
    if (data.medium) {
      queryString += `&medium=${data.medium}`;
    }
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    if (data.q) {
      queryString += `&q=${data.q}`;
    }
    // Add the new search query to the history atom
    setSearchHistory((current) => [...current, queryString]);

    // Navigate to the artwork search page with the constructed query string
    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <br />
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="q"
              {...register("q", { required: "Search query is required" })}
              isInvalid={!!errors.q}
            />
            {errors.q && (
              <div className="invalid-feedback">{errors.q.message}</div>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select
            name="searchBy"
            className="mb-3"
            {...register("searchBy", { required: "Search by is required" })}
            isInvalid={!!errors.searchBy}
          >
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
          {errors.searchBy && (
            <div className="invalid-feedback">{errors.searchBy.message}</div>
          )}
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="geoLocation"
              {...register("geoLocation")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
              &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.),
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="medium"
              {...register("medium")}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;,
              &quot;Furniture&quot;, &quot;Paintings&quot;,
              &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
              values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
            {...register("isHighlight")}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
            {...register("isOnView")}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
