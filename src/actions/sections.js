export function updateSection(obj) {
  return {
    type: 'ADD_SECTION_DATA',
    payload: obj
  };
}

export function clearData() {
  return {
    type: 'CLEAR_DATA'
  };
}
