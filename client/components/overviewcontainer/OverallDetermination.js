import React from 'react';

export default function OverallDetermination() {
  return (
    <div className="overall-determination shape flex-col space-around">
      <div className="center-self bold-font">
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
  return <div>Overall Determination</div>;
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
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
      </div>
      <div className=" star-col flex-col">
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
      </div>
      <div className=" star-col flex-col">
        <Star color="#FAAD14" />
        <Star color="#FE5252" />
        <Star color="#FE5252" />
      </div>
    </div>
  );
}
function Star(props) {
  return <div style={{ backgroundColor: props.color }} className="star"></div>;
}
