import React from 'react'
import Star from '../../assets/icons/star'

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
  )
}

function Header() {
  return <div className="headerTwo">Overall Determination</div>
}

function Determination() {
  return (
    <div className="determination pos-rel">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text.
    </div>
  )
}

function EndingText() {
  return (
    <div className="ending-text align-self">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  )
}

function StarsContainer() {
  return (
    <div className="stars-container flex-row justify-evenly">
      <div className=" star-col flex-col justify-evenly">
        <MetricStar color="#2CDD9B" />
        <MetricStar color="#2CDD9B" />
        <MetricStar color="#2CDD9B" />
      </div>
      <div className=" star-col flex-col justify-evenly">
        <MetricStar color="#2CDD9B" />
        <MetricStar color="#2CDD9B" />
        <MetricStar color="#2CDD9B" />
      </div>
      <div className=" star-col flex-col justify-evenly">
        <MetricStar color="#FAAD14" />
        <MetricStar color="#FE5252" />
        <MetricStar color="#FE5252" />
      </div>
    </div>
  )
}

// function Star(props) {
//   return <div style={{ backgroundColor: props.color }} className="star"></div>;
// }

// TODO: Pass in the metric info to color the stars correctly
function MetricStar(props) {
  return (
    <div className="star">
      <Star className="metric-star" fill={props.color} />
    </div>
  )
}
