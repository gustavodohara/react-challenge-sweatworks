import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from '../shared/action-type.util';

export const ACTION_TYPES = {
  GET_ALL_AUTHORS: 'author/FETCH_AUTHOR_LIST',
  GET_PUBLICATIONS_AUTHOR: 'author/FETCH_PUBLICATIONS_OF_AN_AUTHOR_LIST',
  RESET: 'author/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  authors: [],
  authorPublication: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
    case REQUEST(ACTION_TYPES.GET_ALL_AUTHORS):
    case REQUEST(ACTION_TYPES.GET_PUBLICATIONS_AUTHOR):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.GET_ALL_AUTHORS):
    case FAILURE(ACTION_TYPES.GET_PUBLICATIONS_AUTHOR):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false
      };
    case SUCCESS(ACTION_TYPES.GET_ALL_AUTHORS):
      return {
        ...state,
        loading: false,
        authors: action.payload.data.data
      };
    case SUCCESS(ACTION_TYPES.GET_PUBLICATIONS_AUTHOR):
      const authorId = action.payload.data.data.id;
      const pubs = action.payload.data.data.publications;
      // const authorPublication = { ...state.authorPublication };
      const authorPublication = {  };
      authorPublication[authorId] = pubs;
      return {
        ...state,
        loading: false,
        authorPublication: authorPublication
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;

  }
}

const apiUrl = '/authors';

export const getAuthors = (page, size, sort) => {
  const requestUrl = apiUrl;
  return {
    type: ACTION_TYPES.GET_ALL_AUTHORS,
    payload: axios.get(requestUrl)
  };
};


export const getPublicationOfAnAuthor = (authorId) => {
  const requestUrl = `${apiUrl}/${authorId}/publications`;
  return {
    type: ACTION_TYPES.GET_PUBLICATIONS_AUTHOR,
    payload: axios.get(requestUrl)
  }
}

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

