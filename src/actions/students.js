export function getAllStudents(obj) {
  return {
    type: 'GET_ALL_STUDENTS',
    payload: obj
  };
}

export function postDeleteStudent(obj) {
  return {
    type: 'POST_DELETE_STUDENT',
    payload: obj
  };
}
