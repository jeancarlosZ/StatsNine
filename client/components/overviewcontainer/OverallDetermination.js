import React from 'react';

export default function OverallDetermination() {
  return (
    <div className="overall-determination shape flex-col space-around">
      <div className="center-self">
        <Header />
      </div>

      <div className=" temp flex-row space-around">
        <StarsContainer />
        <Determination />
      </div>
      <div className="center-self">
        <EndingText />
      </div>
    </div>
  );
}

function Header() {
  return <div className="header">Overall Determination</div>;
}

function Determination() {
  return (
    <div className="determination">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text.
    </div>
  );
}

function EndingText() {
  return (
    <div className="ending-text">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  );
}

function StarsContainer() {
  return (
    <div className="stars flex-row">
      <div className=" star-col flex-col">
        <Star />
        <Star />
        <Star />
      </div>
      <div className=" star-col flex-col">
        <Star />
        <Star />
        <Star />
      </div>
      <div className=" star-col flex-col">
        <Star />
        <Star />
        <Star />
      </div>
    </div>
  );
}
function Star() {
  return <div className="star"></div>;
}
