// this function return the current value for the level that is selected for risk tolerance
export default function (state = null, action) {
  switch (action.type) {
    case 'UPDATE_RISK_LEVEL':
      return action.payload;
  }
  return state;
}