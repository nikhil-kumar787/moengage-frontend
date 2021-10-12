import {
  ANIME_CREATE_FAIL,
  ANIME_CREATE_REQUEST,
  ANIME_CREATE_SUCCESS,
} from "../constants/animeConstants";

export const animeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANIME_CREATE_REQUEST:
      return { loading: true };
    case ANIME_CREATE_SUCCESS:
      return { loading: false, success: true };
    case ANIME_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
