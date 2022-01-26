import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Homepage from "./Homepage";
import Table from "../screener/Table";
import AboutUs from "./AboutUs";

export default function Welcome() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <Homepage />
        </Carousel.Item>
        <Carousel.Item>
          <Table />
        </Carousel.Item>
        <Carousel.Item>
          <AboutUs />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
