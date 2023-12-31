import { RESERVE_SUCCESS, RESERVE_FAILURE,FETCH_ALL_RESERVATIONS, FETCH_PAST_RESERVATIONS } from "../actions/reserveAction";

const initialState = {
  reservationSuccess: null,
  reservationError: null,
  pastReservations: [],
  allReservations: [],
};

const reserveReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESERVE_SUCCESS:
      return { ...state, reservationSuccess: action.payload, reservationError: null };
    case RESERVE_FAILURE:
      return { ...state, reservationSuccess: null, reservationError: action.payload };
    case FETCH_PAST_RESERVATIONS:
      return { ...state, pastReservations: action.payload };
    case FETCH_ALL_RESERVATIONS:
      return { ...state, allReservations: action.payload };
    default:
      return state;
  }
};

export default reserveReducer;
