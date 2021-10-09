import React from 'react'
import { useHistory, useLocation } from 'react-router'

export default function MetricSelector() {
  const history = useHistory()
  const location = useLocation()

  const selected = location.pathname.split('/').pop().toLowerCase()

  //* Return JSX
  return (
    <div className="key-metrics-selector">
      <div className="selectors">
        {getSelectorLabel('Key Metrics', history, selected)}
        {getSelectorLabel('Price', history, selected)}
        {getSelectorLabel('Growth', history, selected)}
        {getSelectorLabel('Quality', history, selected)}
        {getSelectorLabel('Safety', history, selected)}
        {/* TODO: Remove this */}
      </div>
    </div>
  )
}

//* Function to get a clickable label
function getSelectorLabel(name, history, selected) {
  //* Format the name so we can work with it
  const fmtName = name.replace(' ', '').toLowerCase()
  return (
    <label
      className={fmtName === selected ? 'selected' : ''}
      onClick={() => {
        //* If the selected page is already the one clicked
        if (fmtName === selected) return
        //* Otherwise update the urlHistory
        history.push(`/overviewpage/${fmtName != 'keymetrics' ? 'keymetrics/' : ''}${fmtName}`)
      }}
    >
      {name}
    </label>
  )
}
