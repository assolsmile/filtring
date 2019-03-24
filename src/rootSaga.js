import { all } from 'redux-saga/effects';
import sagas from './components/sagas'

export default function* rootSaga() {
  yield all ([
    sagas()
  ]);
}
