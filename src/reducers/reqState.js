export const LoadReducer = (state = true, action) => {
  switch (action.type) {
    case "LOAD_PROCESS":
      return true;
    case "LOAD_SUCCESS":
      return false;
    case "LOAD_FAIL":
      return true;
    default:
      return true;
  }
};

const reqStateReducer = (state = "", action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return "ok";
    case "FETCH_POSTS_FAILURE":
      return "ok";

    case "FETCH_POSTS_SUCCESS":
      return JSON.stringify(action.payload);
    default:
      return state;
  }
};

export default reqStateReducer;

//   { type: 'FETCH_POSTS_REQUEST' }
// { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
// { type: 'FETCH_POSTS_SUCCESS', response: { ... } }
