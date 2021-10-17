import React from 'react'
import { getLoadingMessage } from '../utils'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export default function Loading() {
  const loaderColors = [
    '#275be8',
    '#2962fe',
    '#2bbaff',
    '#26c5d9',
    '#00887b',
    '#34b87d',
    '#00bea4',
    '#2cdd9b',
    '#4cae50',
    '#cf3935',
    '#f34336',
    '#fe5252',
    '#e34f32',
    '#fe9700',
    '#faad14',
    '#f38eb0',
    '#a900fe'
  ]

  const color = loaderColors[[Math.floor(Math.random() * loaderColors.length)]]

  return (
    <div className="loading-page">
      <div className="lcontainer">
        <label>{getLoadingMessage()}</label>
        <div className="loader">
          <Loader
            type="ThreeDots"
            color={color}
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        </div>
      </div>
    </div>
  )
}
