const initialState = [];

export default function sections(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_STUDENTS':
      return action.payload
    case "ADD_USER":
      return [
        ...state,
        action.payload
      ]
    case 'DELETE_STUDENT':
      return state.filter(student => student._id === action.payload ? false : true)
    default:
  }
  return state;
}
