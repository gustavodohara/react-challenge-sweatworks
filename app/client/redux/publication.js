import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from '../shared/action-type.util';

export const ACTION_TYPES = {
  GET_ALL_PUBLICATIONS: 'publication/FETCH_PUBLICATION_LIST',
  SEARCH_PUBLICATION: 'publication/SEARCH_PUBLICATION',
  RESET: 'publication/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  publications: [],
  publicationSearch: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REQUEST(ACTION_TYPES.GET_ALL_PUBLICATIONS):
    case REQUEST(ACTION_TYPES.SEARCH_PUBLICATION):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GET_ALL_PUBLICATIONS):
    case FAILURE(ACTION_TYPES.SEARCH_PUBLICATION):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      };
    case SUCCESS(ACTION_TYPES.GET_ALL_PUBLICATIONS):
      return {
        ...state,
        loading: false,
        publications: action.payload.data.data
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PUBLICATION):
      return {
        ...state,
        loading: false,
        publicationSearch: action.payload.data.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;

  }
}

const apiUrl = '/publications';
const searchUrl = '/search';
/**
 * get all publications
 * @param page
 * @param size
 * @param sort
 * @returns {{payload: AxiosPromise<any>, type: string}}
 */
export const getPublications = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.GET_ALL_PUBLICATIONS,
    payload: axios.get(requestUrl)
  };
};

export const searchPublication = query => {
  const requestUrl = `${searchUrl}/${query}`;
  return {
    type: ACTION_TYPES.SEARCH_PUBLICATION,
    payload: axios.get(requestUrl)
  }
}

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

