import {takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';

function* createSaga(action) {
  console.log('action', action)
  try {
    const newStudent = yield call(axios.post, '/api/studentsdb/create', action.payload);
    console.log(newStudent)

    yield put({
      type: "ADD_USER",
      payload: newStudent.data
    });

  } catch (error) {
    yield put({
      type: "SET_ERROR",
      payload: {
        desc: 'Failed to create card',
        error
      }
    });
  }
}

function* deleteSaga(action) {
  try {
    yield call(axios.post, '/api/studentsdb/delete', action.payload
    );

    yield put({
      type: "DELETE_STUDENT",
      payload: action.payload._id
    });

  } catch (error) {
    yield put({
      type: "SET_ERROR",
      payload: {
        desc: 'Failed to delete card',
        error
      }
    });
  }
}

function* rootSaga() {
  yield takeLatest('POST_USER', createSaga);
  yield takeLatest('POST_DELETE_STUDENT', deleteSaga);
}

export default rootSaga;
