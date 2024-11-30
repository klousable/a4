/*********************************************************************************
 *  WEB422 – Assignment 06
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Carrie Leung Student ID: 106844228 Date: November 27, 2024
 *
 *  Vercel App (Deployed) Link: https://a4-kappa.vercel.app/
 * Named A4 but has A6 functionality
 * Render App for API https://user-api-91ww.onrender.com
 * SLOW login and register
 ********************************************************************************/

import { Image, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="The Metropolitan Museum of Art"
        fluid
        rounded
      />
      <br />
      <br />
      <Row>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially
            &ldquo;the Met,&rdquo; is the largest art museum in the Americas.
            Its permanent collection contains over two million works, divided
            among 17 curatorial departments. The main building at 1000 Fifth
            Avenue, along the Museum Mile on the eastern edge of Central Park in
            Manhattan&rsquo;s Upper East Side, is by area one of the
            world&rsquo;s largest art museums.
          </p>
        </Col>
        <Col md={6}>
          <p>
            Founded in 1870 by a group of American citizens, the museum&rsquo;s
            mission was to bring art and art education to the American people.
            The Met&rsquo;s permanent collection consists of works of art from
            classical antiquity and ancient Egypt, paintings, and sculptures
            from nearly all the European masters, and an extensive collection of
            American and modern art.
          </p>
          <p>
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Read more on Wikipedia&hellip;
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
}
