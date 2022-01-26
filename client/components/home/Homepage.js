import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Newsfeed from "./Newsfeed";
import SnP500 from "./SnP500";
import Calendar from "./Calendar";
import Alert from "../home/common/Alert";

export default function Homepage() {
  return (
    <Container fluid className="position-relative">
      <Card className="bg-dark text-white">
        <Card.Img src="./images/dashboard.jpg" alt="NYC" style={{ filter: "brightness(40%)" }} />
        <Card.ImgOverlay>
          <Col>
            <Row>
              <Col>
                <Newsfeed />
              </Col>
              <Col>
                <SnP500 />
                <Calendar />
              </Col>
            </Row>
            <Row>
              <Alert />
            </Row>
          </Col>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
}
