import { all, fork } from 'redux-saga/effects';
import matchesSaga from './matches/sagas';

const sagas = [matchesSaga];

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
