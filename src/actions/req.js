import axios from "axios";

export const LOAD_PROCESS = "LOAD_PROCESS";
export const LOAD_FAIL = "LOAD_FAIL";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";

//TODO record api url
const sourceApi = () =>
  axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_WEATHER_API
    }&q=London&aqi=no`
  );

const fetchReader = async (promise) => {
  try {
    let data = await promise();
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};

export const callApi = (fetchMaterial) => async (dispatch) => {
  dispatch({ type: LOAD_PROCESS });

  const res = await fetchReader(sourceApi);

  if (res[1]) {
    console.log(`some error occurs: ${res[1]}`);
    dispatch({ type: LOAD_FAIL });
    return;
  }

  dispatch({
    type: FETCH_POSTS_SUCCESS,
    payload: res[0],
    receivedTime: Date.now(),
  });
  dispatch({ type: LOAD_PROCESS });

  //   return sourceApi().then((payload) => {
  //     dispatch({ type: "FETCH_POSTS_SUCCESS", payload });
  //     dispatch({ type: "LOAD_SUCCESS" });
  //   });
};

export const thunkFnWithoutArgs = (dispatch, getState) => {
  console.log("dispatch", dispatch, "getState", getState);
  const stateBefore = getState();
  console.log(`Counter before: ${stateBefore}`);
  //   dispatch(increment());
  const stateAfter = getState();
  console.log(`Counter after: ${stateAfter}`);
};

export const exampleThunkFunction = (dispatch, getState) => {
  console.log("dispatch", dispatch, "getState", getState);
  const stateBefore = getState();
  console.log(`Counter before: ${stateBefore}`);
  //   dispatch(increment());
  const stateAfter = getState();
  console.log(`Counter after: ${stateAfter}`);
};

//另外的async fetch寫法
// 使用 redux-thunk 時，action creators 會回傳的不是物件，而是一個帶有 dispatch, getState, extraArgument 參數的 async function，並在這個 async function 會再去執行 dispatch 方法，來通知到 reducer：
export const FETCH_USERS = "fetch_users";
// async (dispatch, getState,extraArgument)  //custom arg in final
export const fetchUsers = () => async (dispatch, getState, axiosInstance) => {
  const res = await axiosInstance.get("/users");

  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};
