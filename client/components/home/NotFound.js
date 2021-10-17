import React from 'react'
import { useHistory } from 'react-router'

export default function NotFound() {
  return (
    <div className="loading-page">
      <div className="lcontainer">
        <img src="https://c.tenor.com/JrGZjfUdpMAAAAAC/bugs-bunny-albuquerque.gif" alt="" />
        <label className="zoomable">Oops. It look's like you've taken a wrong turn!</label>
      </div>
    </div>
  )
}
