import { SET_TICKER, UPDATE_LOCAL } from '.'

//* Initial state
const initialState = {
  symbol: 'MSFT'
}

//* Reducer
export default function localReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKER:
      //* When the ticker changes, we clear the object!
      //* This is so we don't display the wrong data
      return action.payload
    case UPDATE_LOCAL:
      return { ...state, [action.key]: action.payload }
    default:
      return state
  }
}
