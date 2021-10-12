import axios from "axios";

import {
  ANIME_CREATE_FAIL,
  ANIME_CREATE_REQUEST,
  ANIME_CREATE_SUCCESS,
} from "../constants/animeConstants";

export const createReviewAction =
  (name, rating, userId, animeId, desc) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ANIME_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `https://moengage-backend.herokuapp.com/api/users/review`,
        {
          name,
          rating,
          userId,
          animeId,
          desc,
        }
      );

      dispatch({
        type: ANIME_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ANIME_CREATE_FAIL,
        payload: message,
      });
    }
  };
