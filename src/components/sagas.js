import {call, put, takeEvery} from "redux-saga/effects";
import * as api from "../lib/network";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

export function* loadAll() {
  try {
    const {data} = yield call(api.loadAll);
    yield put(
      actions.loadAllSuccess(data)
    );
  } catch (error) {
    yield  actions.loadAllError(error)
  }
}

export default function* sagas() {
  yield takeEvery(actionTypes.LOAD_ALL, loadAll);
}
