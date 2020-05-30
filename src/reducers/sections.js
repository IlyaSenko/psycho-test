const initialState = {};

export default function sections(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SECTION_DATA':
      return {
        ...state,
        [action.payload.sectionNumber]: action.payload.questions
      }
    case 'CLEAR_DATA':
      return {}
    default:
  }
  return state;
}
