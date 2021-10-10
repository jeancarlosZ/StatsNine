import { SET_TICKER, UPDATE_LOCAL } from '.'

//* Initial state
const initialState = {
  ticker: 'MSFT',
}

//* Reducer
export default function localReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKER:
      return { ...state, ticker: action.payload }
    case UPDATE_LOCAL:
      return { ...state, [action.key]: action.payload }
    default:
      return state
  }
}
