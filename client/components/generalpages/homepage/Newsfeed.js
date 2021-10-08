import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import UniversalChart from '../../UniversalChart';
// import utils from '../../../utils';

export default function Newsfeed(props) {
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary dropdown-toggle">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-calendar"
              aria-hidden="true"
              data-darkreader-inline-stroke=""
              style="--darkreader-inline-stroke:currentColor;">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg> */}
            This week
          </button>
        </div>
      </div>
      <Container>
        <Row>
          <Col>
            <h2>News feed</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">logo</th>
                    <th scope="col">Company</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>logo</td>
                    <td>Name and Description</td>
                  </tr>
                  <tr>
                    <td>logo</td>
                    <td>placeholder</td>
                  </tr>
                  <tr>
                    <td>logo</td>
                    <td>data</td>
                  </tr>
                  <tr>
                    <td>logo</td>
                    <td>information</td>
                  </tr>
                  <tr>
                    <td>logo</td>
                    <td>text</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col>
            {/* <UniversalChart
              className="my-4 w-100 chartjs-render-monitor"
              title="SnP500"
              id="myChart"
              width="1304"
              height="550"
              style="display: block; height: 275px; width: 652px;"
            /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
