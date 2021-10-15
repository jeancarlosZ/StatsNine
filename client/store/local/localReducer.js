import { SET_TICKER, UPDATE_LOCAL } from '.'

//* Check to see if we have a ticker in local storage
//* This was added so that if they refresh the page it
//* doesn't just show them the default stock, but the
//* actual stock they were looking at instead.
const local = window.localStorage.getItem('symbol')

//* Initial state
const initialState = {
  isDefault: local ? false : true,
  symbol: local ? local : 'MSFT'
}

//* Reducer
export default function localReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKER:
      //* If the ticker selected is already the one we have stored
      if (state.symbol === action.payload.symbol) return { ...state, isDefault: true }
      //* When the ticker changes, we clear the object!
      //* This is so we don't display the wrong data
      return { ...action.payload, isDefault: true }
    case UPDATE_LOCAL:
      return { ...state, [action.key]: action.payload }
    default:
      return state
  }
}
