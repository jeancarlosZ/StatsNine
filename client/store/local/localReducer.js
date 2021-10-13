import { SET_TICKER, UPDATE_LOCAL } from '.'

//* Initial state
const initialState = {
  isDefault: false,
  symbol: 'MSFT'
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
