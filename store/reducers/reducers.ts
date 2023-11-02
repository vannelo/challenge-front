import { FETCH_KEANU_SUCCESS } from "../actions/actions";

export type State = {
  keanuImage: { url: string } | null;
};

const initialState = {
  keanuImage: null,
} as State;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KEANU_SUCCESS:
      return {
        ...state,
        keanuImage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
