import React from 'react';

export default function OverallDetermination() {
  return (
    <div className="overall-determination flex-col justify-around">
      <Header />
      <div className="flex-row justify-around justify-center">
        <StarsContainer />
        <Determination />
      </div>
      <EndingText />
    </div>
  );
}

function Header() {
  return <div className="headerTwo">Overall Determination</div>;
}

function Determination() {
  return (
    <div className="determination pos-rel">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text.
    </div>
  );
}

function EndingText() {
  return (
    <div className="ending-text align-self">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  );
}

function StarsContainer() {
  return (
    <div className="stars-container flex-row justify-evenly">
      <div className=" star-col flex-col justify-evenly">
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
      </div>
      <div className=" star-col flex-col justify-evenly">
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
        <Star color="#2CDD9B" />
      </div>
      <div className=" star-col flex-col justify-evenly">
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
