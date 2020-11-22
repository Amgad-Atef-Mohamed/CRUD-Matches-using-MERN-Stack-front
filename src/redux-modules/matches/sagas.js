import { takeEvery, takeLatest, put } from 'redux-saga/effects';
import { Api, Urls, Status } from 'utils/api';
import { MATCHES } from './actions';
import querystring from "querystring";

const {
  GET_ALL_MATCHES,
  GET_ALL_MATCHES_SUCCESS,
  GET_ALL_MATCHES_FAIL,
  ADD_MATCH,
  ADD_MATCH_SUCCESS,
  ADD_MATCH_FAIL,
  DELETE_MATCH,
  DELETE_MATCH_SUCCESS,
  DELETE_MATCH_FAIL,
  UPDATE_MATCH,
  UPDATE_MATCH_SUCCESS,
  UPDATE_MATCH_FAIL,
} = MATCHES;

function* getAllMatches(payload) {
  const { options, applyNewFilter } = payload;
  const { matches } = Urls;
  const api = new Api();
  const header = [];
  const queryString = querystring.stringify(options);
  let url = `${matches.getAll}?${queryString}`;

  const response = yield api.get(url, header);

  if (Status.isSuccess(response.status)) {
    const { response: allMatches } = response;

    yield put({
      type: GET_ALL_MATCHES_SUCCESS,
      matches: allMatches,
      applyNewFilter,
    });
  } else {
    const {
      response: { message },
    } = response;
    yield put({
      type: GET_ALL_MATCHES_FAIL,
      err: message,
    });
  }
}

function* addMatch(payload) {
  const { newMatchInfo } = payload;
  const { matches } = Urls;
  const url = `${matches.add}`;
  const api = new Api();
  const body = {
    ...newMatchInfo,
  };
  const header = [];
  const response = yield api.post(url, body, header);

  if (Status.isSuccess(response.status)) {
    const { response: newMatchInfoResponse } = response;

    yield put({
      type: ADD_MATCH_SUCCESS,
      newMatchInfo: newMatchInfoResponse,
    });
  } else {
    const {
      response: { message },
    } = response;

    yield put({
      type: ADD_MATCH_FAIL,
      err: message,
    });
  }
}
function* updateMatch(payload) {
  const { newMatchInfo, matchId, index } = payload;
  const { matches } = Urls;
  const url = `${matches.update}/${matchId}`;
  const api = new Api();
  const body = {
    ...newMatchInfo,
  };
  const header = [];
  const response = yield api.patch(url, body, header);

  if (Status.isSuccess(response.status)) {
    const {
      response: updatedMatch ,
    } = response;
    yield put({
      type: UPDATE_MATCH_SUCCESS,
      newMatchInfo: updatedMatch,
      index,
    });
  } else {
    const {
      response: { message },
    } = response;

    yield put({
      type: UPDATE_MATCH_FAIL,
      err: message,
    });
  }
}

function* deleteMatch(payload) {
  const { matchId, index } = payload;
  const { matches } = Urls;
  const url = `${matches.delete}/${matchId}`;
  const api = new Api();
  const header = [];

  const response = yield api.delete(url, undefined, header);

  if (Status.isSuccess(response.status)) {
    yield put({
      type: DELETE_MATCH_SUCCESS,
      index,
    });
  } else {
    const {
      response: { message },
    } = response;

    yield put({
      type: DELETE_MATCH_FAIL,
      err: message,
    });
  }
}


function* workersSaga() {
  yield takeLatest(GET_ALL_MATCHES, getAllMatches);
  yield takeEvery(ADD_MATCH, addMatch);
  yield takeEvery(UPDATE_MATCH, updateMatch);
  yield takeEvery(DELETE_MATCH, deleteMatch);
}

export default workersSaga;
