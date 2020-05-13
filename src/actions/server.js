export function postUser(obj) {
  return {
    type: 'POST_USER',
    payload: obj
  };
}
