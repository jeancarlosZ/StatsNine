import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Newsfeed from './Newsfeed';
import SnP500 from './SnP500';
import Calendar from './Calendar';
import Dashboard from './Dashboard';

export default function Homepage() {
  return (
    <div>
      <Dashboard />
      <Container fluid>
        <Row xs={1} md={2}>
          <Col>
            <Newsfeed />
          </Col>
          <Col>
            <SnP500 />
          </Col>
          <Col>
            <Calendar />
          </Col>
        </Row>
        <Row>
          <div>
            <h1 className="display-4 font-weight-bold mb-3 text-white">
              Modern, Flexible and Responsive ReactJS Gurus working for you
            </h1>
            <p className="lead font-weight-light mb-3 landing-text">
              A professional package that comes with hunderds of UI components,
              forms, tables, charts, dashboards, pages and svg icons. Each one
              is fully customizable, responsive and easy to use.
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
}
