import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Newsfeed from './Newsfeed';
import SnP500 from './SnP500';
import Calendar from './Calendar';
import Alert from '../home/common/Alert';
import Pic from '../home/common/pic.png';

export default function Homepage() {
  return (
    <div>
      <div>
        <Card className="bg-dark text-white">
          <Card.Img src={Pic} alt="NYC" style={{ filter: 'brightness(30%)' }} />
          <Card.ImgOverlay>
            <Container fluid>
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
            </Container>
          </Card.ImgOverlay>
        </Card>
      </div>
    </div>
  );
}
