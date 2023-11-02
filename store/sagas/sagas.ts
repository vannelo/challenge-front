import { put, takeLatest, call, all } from "redux-saga/effects";
import {
  FETCH_KEANU_REQUEST,
  fetchKeanuSuccess,
  fetchKeanuFailure,
} from "../actions/actions";
import * as api from "../api/api";

function* fetchKeanu(action) {
  try {
    const keanuImage = yield call(api.fetchKeanuImage, action.payload);
    yield put(fetchKeanuSuccess(keanuImage));
  } catch (error) {
    yield put(fetchKeanuFailure(error));
  }
}

function* watchFetchKeanuRequest() {
  yield takeLatest(FETCH_KEANU_REQUEST, fetchKeanu);
}

export default function* rootSaga() {
  yield all([watchFetchKeanuRequest()]);
}
