export const MATCHES = {
  GET_ALL_MATCHES: 'GET_ALL_MATCHES',
  GET_ALL_MATCHES_SUCCESS: 'GET_ALL_MATCHES_SUCCESS',
  GET_ALL_MATCHES_FAIL: 'GET_ALL_MATCHES_FAIL',
  ADD_MATCH: 'ADD_MATCH',
  ADD_MATCH_SUCCESS: 'ADD_MATCH_SUCCESS',
  ADD_MATCH_FAIL: 'ADD_MATCH_FAIL',
  ADD_MATCH_RESET: 'ADD_MATCH_RESET',
  DELETE_MATCH: 'DELETE_MATCH',
  DELETE_MATCH_SUCCESS: 'DELETE_MATCH_SUCCESS',
  DELETE_MATCH_FAIL: 'DELETE_MATCH_FAIL',
  TOGGLE_ADD_NEW_MATCH_MODAL: 'TOGGLE_ADD_NEW_MATCH_MODAL',
  TOGGLE_EDIT_MATCH_MODAL: 'TOGGLE_EDIT_MATCH_MODAL',
  GET_MATCH: 'GET_MATCH',
  GET_MATCH_SUCCESS: 'GET_MATCH_SUCCESS',
  GET_MATCH_FAIL: 'GET_MATCH_FAIL',
  UPDATE_MATCH: 'UPDATE_MATCH',
  UPDATE_MATCH_SUCCESS: 'UPDATE_MATCH_SUCCESS',
  UPDATE_MATCH_FAIL: 'UPDATE_MATCH_FAIL',
};

export const getAllMatches = (options, applyNewFilter = false) => ({
  type: MATCHES.GET_ALL_MATCHES,
  options,
  applyNewFilter,
});

export const getAllMatchesSuccess = (matches, applyNewFilter = false) => ({
  type: MATCHES.GET_ALL_MATCHES_SUCCESS,
  matches,
  applyNewFilter,
});

export const getAllMatchesFail = err => ({
  type: MATCHES.GET_ALL_MATCHES_FAIL,
  err,
});

export const addMatch = newMatchInfo => ({
  type: MATCHES.ADD_MATCH,
  newMatchInfo,
});

export const addMatchSuccess = newMatchInfo => ({
  type: MATCHES.ADD_MATCH_SUCCESS,
  newMatchInfo,
});

export const addMatchFail = err => ({
  type: MATCHES.ADD_MATCH_FAIL,
  err,
});

export const updateMatch = (newMatchInfo, matchId, index) => ({
  type: MATCHES.UPDATE_MATCH,
  newMatchInfo,
  matchId,
  index,
});

export const updateMatchSuccess = (newMatchInfo, index) => ({
  type: MATCHES.UPDATE_MATCH_SUCCESS,
  newMatchInfo,
  index,
});

export const updateMatchFail = err => ({
  type: MATCHES.UPDATE_MATCH_FAIL,
  err,
});

export const addMatchReset = () => ({
  type: MATCHES.ADD_MATCH_RESET,
});

export const deleteMatch = (matchId, index) => ({
  type: MATCHES.DELETE_MATCH,
  matchId,
  index,
});

export const deleteMatchSuccess = index => ({
  type: MATCHES.DELETE_MATCH_SUCCESS,
  index,
});

export const deleteMatchFail = err => ({
  type: MATCHES.DELETE_MATCH_FAIL,
  err,
});

export const toggleAddNewMatchModal = () => ({
  type: MATCHES.TOGGLE_ADD_NEW_MATCH_MODAL,
});

export const openEditMatchModal = () => ({
  type: MATCHES.TOGGLE_EDIT_MATCH_MODAL,
});

export const getMatch = (options, applyNewFilter = false) => ({
  type: MATCHES.GET_MATCH,
  options,
  applyNewFilter,
});

export const getMatchSuccess = (matchCodesReportList, applyNewFilter = false) => ({
  type: MATCHES.GET_MATCH_SUCCESS,
  matchCodesReportList,
  applyNewFilter,
});

export const getMatchFail = err => ({
  type: MATCHES.GET_MATCH_FAIL,
  err,
});
