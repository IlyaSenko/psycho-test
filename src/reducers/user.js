const initialState = {};

export default function sections(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER_DATA':
      return action.payload
    case "ADD_USER":
      return {
        ...state,
        _id: action.payload._id
      }
    case 'CLEAR_DATA':
      return {}
    default:
  }
  return state;
}
