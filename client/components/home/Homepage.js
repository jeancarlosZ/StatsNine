import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Newsfeed from './Newsfeed';
import SnP500 from './SnP500';
import Calendar from './Calendar';
import Alert from '../home/common/Alert';

export default function Homepage() {
  return (
    <div>
      <div>
        <Card className="bg-dark text-white">
          <Card.Img
            src="https://images.unsplash.com/photo-1563610565075-002447a1e162?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2371&q=80"
            alt="Card image"
            style={{ filter: 'brightness(40%)' }}
          />
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
