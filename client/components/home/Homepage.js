import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Newsfeed from './Newsfeed';
import SnP500 from './SnP500';
import Calendar from './Calendar';
import Alert from '../home/common/Alert';

export default function Homepage() {
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
}
