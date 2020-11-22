import { unionBy } from 'lodash';
import ROUTES from 'routes';
import update from 'immutability-helper';
import { MATCHES } from './actions';

const initialState = {
  matches: undefined,
  hasMoreMatches: true,
  applyNewFilter: false,
  getAllMatches: {
    isFetching: false,
    isSuccess: false,
    isFail: { isError: false, message: '' },
  },
  addMatch: {
    isFetching: false,
    isSuccess: false,
    isFail: { isError: false, message: '' },
  },
  editMatch: {
    isFetching: false,
    isSuccess: false,
    isFail: { isError: false, message: '' },
  },
  deleteMatch: {
    isFetching: false,
    isSuccess: false,
    isFail: { isError: false, message: '' },
  },
  confirmModal: { isOpen: false },
  addNewMatchModal: { isOpen: false },
  editMatchModal: { isOpen: false },
  matchesReportList: undefined,
  getMatchesReport: {
    isFetching: false,
    isSuccess: false,
    isFail: { isError: false, message: '' },
  },
};

export default (state = initialState, { type, ...payload }) => {
  const {
    GET_ALL_MATCHES,
    GET_ALL_MATCHES_SUCCESS,
    GET_ALL_MATCHES_FAIL,
    ADD_MATCH,
    ADD_MATCH_SUCCESS,
    ADD_MATCH_FAIL,
    ADD_MATCH_RESET,
    DELETE_MATCH,
    DELETE_MATCH_SUCCESS,
    DELETE_MATCH_FAIL,
    TOGGLE_ADD_NEW_MATCH_MODAL,
    GET_MATCH,
    GET_MATCH_SUCCESS,
    GET_MATCH_FAIL,

    UPDATE_MATCH,
    UPDATE_MATCH_SUCCESS,
    UPDATE_MATCH_FAIL,
    TOGGLE_EDIT_MATCH_MODAL,
  } = MATCHES;
  const { MATCHES: MATCHES_ROUTE } = ROUTES;
  const {
    matches,
    applyNewFilter,
    index,
    isOpen,
    newMatchInfo,
    matchesReportList,
    err,
  } = payload;
  const {
    matches: matchesState,
    matchesReportList: matchesReportListState,
    addNewMatchModal: { isOpen: addNewMatchModalIsOpenState },
    editMatchModal: { isOpen: editMatchModalOpenState },
  } = state;

  switch (type) {
    case GET_ALL_MATCHES: {
      return {
        ...state,
        applyNewFilter,
        getAllMatches: {
          isFetching: true,
          isSuccess: false,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case GET_ALL_MATCHES_SUCCESS: {
      return {
        ...state,
        matches:
          matchesState && !applyNewFilter
            ? unionBy(matchesState, matches, '_id')
            : matches,
        hasMoreMatches: matches.length === 20,
        getAllMatches: {
          isFetching: false,
          isSuccess: true,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case GET_ALL_MATCHES_FAIL: {
      return {
        ...state,
        getAllMatches: {
          isFetching: false,
          isSuccess: false,
          isFail: { isError: true, message: err },
        },
      };
    }
    case ADD_MATCH: {
      return {
        ...state,
        addMatch: {
          isFetching: true,
          isSuccess: false,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case ADD_MATCH_SUCCESS: {
      matchesState.unshift(newMatchInfo);

      return {
        ...state,
        matches: matchesState,
        addMatch: {
          isFetching: false,
          isSuccess: true,
          isFail: { isError: false, message: '' },
        },
        addNewMatchModal: { isOpen },
      };
    }
    case ADD_MATCH_FAIL: {
      return {
        ...state,
        addMatch: {
          isFetching: false,
          isSuccess: false,
          isFail: { isError: true, message: err },
        },
      };
    }
    case ADD_MATCH_RESET: {
      return {
        ...state,
        addMatch: {
          isFetching: false,
          isSuccess: false,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case DELETE_MATCH: {
      return {
        ...state,
        deleteMatch: {
          isFetching: true,
          isSuccess: false,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case DELETE_MATCH_SUCCESS: {
      if (index !== undefined) matchesState.splice(index, 1);
      else window.location.pathname = MATCHES_ROUTE;

      return {
        ...state,
        matches: matchesState,
        deleteMatch: {
          isFetching: false,
          isSuccess: true,
          isFail: { isError: false, message: '' },
        },
        confirmModal: { isOpen },
      };
    }
    case DELETE_MATCH_FAIL: {
      return {
        ...state,
        deleteMatch: {
          isFetching: false,
          isSuccess: false,
          isFail: { isError: true, message: err },
        },
      };
    }
    case TOGGLE_ADD_NEW_MATCH_MODAL: {
      return {
        ...state,
        addNewMatchModal: {
          isOpen: !addNewMatchModalIsOpenState,
        },
      };
    }
    case GET_MATCH: {
      return {
        ...state,
        applyNewFilter,
        getMatchesReport: {
          isFetching: true,
          isSuccess: false,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case GET_MATCH_SUCCESS: {
      return {
        ...state,
        matchesReportList:
          matchesReportListState && !applyNewFilter
            ? unionBy(matchesReportListState, matchesReportList, '_id')
            : matchesReportList,
        hasMoreMatches: matchesReportList.length === 20,
        getMatchesReport: {
          isFetching: false,
          isSuccess: true,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case GET_MATCH_FAIL: {
      return {
        ...state,
        getMatchesReport: {
          isFetching: false,
          isSuccess: false,
          isFail: { isError: true, message: err },
        },
      };
    }

    case UPDATE_MATCH: {
      return {
        ...state,
        editMatch: {
          isFetching: true,
          isSuccess: false,
          isFail: { isError: false, message: '' },
        },
      };
    }
    case UPDATE_MATCH_SUCCESS: {
      console.log('newMatchInfo...........', newMatchInfo)
      console.log('index..........', index)

      const updatedMatches = update(matchesState, {
        [index]: { $set: { ...newMatchInfo } },
      });

      return {
        ...state,
        matches: updatedMatches,
        editMatch: {
          isFetching: false,
          isSuccess: true,
          isFail: { isError: false, message: '' },
        },
        editMatchModal: {
          isOpen: !editMatchModalOpenState,
        },
      };
    }
    case UPDATE_MATCH_FAIL: {
      return {
        ...state,
        editMatch: {
          isFetching: false,
          isSuccess: false,
          isFail: { isError: true, message: err },
        },
      };
    }
    case TOGGLE_EDIT_MATCH_MODAL: {
      return {
        ...state,
        editMatchModal: { isOpen: !editMatchModalOpenState },
      };
    }
    default:
      return state;
  }
};
