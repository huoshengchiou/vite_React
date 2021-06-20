import {
  put,
  takeEvery,
  all,
  delay,
  call,
  takeLatest,
  select,
  take,
} from "redux-saga/effects";
import axios from "axios";

// export function* helloSaga() {
//   console.log("Hello Sagas!");
// }

// // 我們工作的 saga：將執行非同步的 increment task
// // 延遲 1 秒後發出 type 為 'INCREMENT' 的事件
// export function* incrementAsync() {
//   yield delay(1000);
//   yield put({ type: "INCREMENT" });
// }

// // 我們觀察的 saga：當在 type 為 INCREMENT_ASYNC 時 就會執行 incrementAsync task
// export function* watchIncrementAsync() {
//   yield takeEvery("INCREMENT_ASYNC", incrementAsync);
// }

// // 定義 rootSaga
// export default function* rootSaga() {
//   yield all([helloSaga(), watchIncrementAsync()]);
// }

// 工作的 Saga：當 action 是 USER_FETCH_REQUESTED 時被觸發
function* fetchUser(action) {
  console.log("執行fetchUser");

  try {
    const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({ type: "FETCH_POSTS_SUCCESS", payload: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const test = () => {
  console.log("test");
};

function* doSomeAsync(action) {
  console.log("action", action);
  console.log("start");
  let res = yield axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_WEATHER_API
    }&q=London&aqi=no`
  );
  console.log("res", res);
  console.log("end");
  yield delay(5000);
  yield put({ type: "FETCH_POSTS_SUCCESS", payload: res });
  //   yield {
  //     CALL: {
  //       fn: test,
  //       args: ["./products"],
  //     },
  //   };
}

/*
   在每次 dispatch `USER_FETCH_REQUESTED` action 時，啟動 fetchUser。
   允許同時取得使用者。
 */
function* mySaga(a, b) {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  //   takeLatest 在任何時候只允許一個 fetchData task 執行，它將啟動最新的 task。如果先前提供的 task 還在執行，當其他的 fetchData task 被啟動，先前的 task 會自動被取消。
  yield takeLatest("USER_FETCH_REQUESTED_LATEST", doSomeAsync);
  yield takeEvery("*", function* logger(action) {
    const state = yield select();
    console.log("saga logger action", action);
    console.log("saga logger state after", state);
  });
}

/*
   另外你也可以使用 takeLatest。
 
   但不允許同時取得使用者。當一個 fetch 已經在 pending 時，如果取得 dispatch「USER_FETCH_REQUESTED」，
   正在等待的 fetch 會被取消，只執行最新的發出的 USER_FETCH_REQUESTED。
 */
//  function* mySaga() {
//    ("USER_FETCH_REQUESTED", fetchUser);
//  }

export default mySaga;

// 在 redux-saga 中，Saga 都是使用 Generator function 實作的。我們從 Generator yield 純 JavaScript 物件來表達 Saga 的邏輯。我們稱這些物件為 Effects。一個 Effect 是一個簡單的物件，它包含了一些由 middleware 解譯的資訊。你可以把 Effect 看作是給 middleware 執行一些操作的說明（也就是說，調用一些非同步的 function，dispatch 一個 action 到 store）。

// function fetchProductsApi() {
//     return Api.fetch('/products')
//       .then(response => ({ response }))
//       .catch(error => ({ error }))
//   }

//   function* fetchProducts() {
//     const { response, error } = yield call(fetchProductsApi)
//     if (response)
//       yield put({ type: 'PRODUCTS_RECEIVED', products: response })
//     else
//       yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
//   }
