import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Newsfeed from './Newsfeed';
import SnP500 from './SnP500';
import Calendar from './Calendar';
import Calendar1 from './Welcome';
import Dashboard from './Dashboard';

export default function Homepage() {
  return (
    <div>
      <Dashboard />
      <Container fluid>
        <Row>
          <Col>
            <Newsfeed />
          </Col>
          <Col>
            <SnP500 />
          </Col>
        </Row>
        <Row>
          <Col>2</Col>
          <Col>
            <Calendar />
          </Col>
        </Row>
        <Row>
          <div>
            <p className="lead font-weight-light mb-3 landing-text">
              This tool does not provide financial advice. It is intended for
              information and educational purpose only. It is not a substitution
              for professional financial advise.
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
}
