export const FETCH_KEANU_REQUEST = "FETCH_KEANU_REQUEST";
export const FETCH_KEANU_SUCCESS = "FETCH_KEANU_SUCCESS";
export const FETCH_KEANU_FAILURE = "FETCH_KEANU_FAILURE";

export const fetchKeanuRequest = (payload) => ({
  type: FETCH_KEANU_REQUEST,
  payload,
});

export const fetchKeanuSuccess = (payload) => ({
  type: FETCH_KEANU_SUCCESS,
  payload,
});

export const fetchKeanuFailure = (error) => ({
  type: FETCH_KEANU_FAILURE,
  error,
});
