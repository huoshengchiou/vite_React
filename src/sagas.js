// 在 redux-saga 中，Saga 都是使用 Generator function 實作的。
// 我們從 Generator yield 純 JavaScript 物件來表達 Saga 的邏輯。
// 我們稱這些物件為 Effects。一個 Effect 是一個簡單的物件，它包含了一些由 middleware 解譯的資訊。
// 你可以把 Effect 看作是給 middleware 執行一些操作的說明（也就是說，調用一些非同步的 function，dispatch 一個 action 到 store）。

// Effect-generated fns provided by saga
// put => redux dispatch
import {
  put,
  takeEvery,
  all,
  delay,
  call,
  takeLatest,
  select,
  take,
  cps,
} from "redux-saga/effects";
import axios from "axios";
// use effects combined with high-level APIs like takeEvery to achieve the same things as redux-thunk, but with the added benefit of easy testability.

// handle Node style functions (e.g. fn(...args, callback) where callback is of the form (error, result) => ()).
// cps stands for Continuation Passing Style.
// const content = yield cps(readFile, '/path/to/file')

const source = () =>
  axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=${
        import.meta.env.VITE_WEATHER_API
      }&q=London&aqi=no`
    )
    .then((r) => [r, null])
    .catch((err) => [null, err]);

function* callEffectsAtOnce() {
  // yield 一個 effect 的陣列，generator 會被阻塞在這一個步驟，直到所有 effect 都被 resolve 或過程中被 reject（就像 Promise.all 的行為）
  // 將同時啟動所有子 generator，等待它們完成然後回傳完整結果並恢復執行
  const [data, err] = yield all([
    call(source, "....args"),
    call(source, "....args"),
  ]);
  console.log("data", data);
}

// dispatch USER_FETCH_REQUESTED indeced Saga
function* fetchUser(action) {
  console.log("執行dispatch USER_FETCH_REQUESTED effect");
  try {
    // Effect -> call the function Api.fetchUser with other arguments

    // effect call structure:
    // call(fn, ...args) function
    // {
    //   CALL: {
    //     fn: Api.fetchUser,
    //     args: ['action.payload.userId']
    //   }
    // }
    const user = yield call(Api.fetchUser, "other args");
    // Effect PUT => will dispatch an action to the redux Store.
    // 在saga內的fn會return 一個obj(called effect)
    // { PUT: {type: "FETCH_POSTS_SUCCESS", payload: user } }
    yield put({ type: "FETCH_POSTS_SUCCESS", payload: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}
//self custom delay
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
}

// 創造一個saga generator instance進行測試
// const testInstance = doSomeAsync();
// console.log("testInstance", testInstance.next().value);

/*
   在每次 dispatch `USER_FETCH_REQUESTED` action 時，啟動 fetchUser。
   允許同時取得使用者。
 */

function* watchAndLog() {
  while (import.meta.env.MODE === "development") {
    const action = yield take("*");
    const state = yield select();

    console.log("action from take", action);
    console.log("state after from take", state);
  }
}

//assign tasks to saga when tag
function* mySaga(a, b) {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  //   takeLatest 在任何時候只允許一個 fetchData task 執行，它將啟動最新的 task。如果先前提供的 task 還在執行，當其他的 fetchData task 被啟動，先前的 task 會自動被取消。
  yield takeLatest("USER_FETCH_REQUESTED_LATEST", doSomeAsync);

  //run mutiple
  yield takeEvery("RUN_MULTIPLE", callEffectsAtOnce);

  // yield takeEvery("*", watchAndLog);

  //讓saga主動去pull，take可以map特定的event
  // take Effect 讓我們可以在一個集中的地方更好的描述一個非同步的流程。

  while (true) {
    //透過env vari操作log
    if (import.meta.env.MODE === "development") {
      yield take("*");
      console.log("saga from dev");
    }
    let action = yield take("LOGIN");
    // ... 執行登入邏輯
    console.log("LOGIN", action);
    yield take("LOGOUT");
    console.log("LOGOUT");
    // ... 執行登出邏輯
  }

  //偵測到所有action的tag//透過while true 持續在saga裡運行
  // 可以加入環境控管
  // while (true) {
  //   const action = yield take("*");
  //   const state = yield select();
  //   // get all states from store
  //   console.log("action", action);
  //   console.log("state after", state);
  // }
  // yield takeEvery("*", function* logger(action) {
  //   const state = yield select();
  //   console.log("saga logger action", action);
  //   console.log("saga logger state after", state);
  // });
}
// ---------------------------------------------------
// export function* task1() {
//   yield delay(1000);
//   yield put({ type: "INCREMENT" });
// }

// export function* task2() {
//   yield delay(500);
//   yield put({ type: "INCREMENT" });
// }

// export function* sagaFlow1() {
//   yield takeEvery("ORDER_1", task1);
// }

// export function* sagaFlow2() {
//   yield takeEvery("ORDER_2", task2);
// }

// // 定義 rootSaga 彙整所有需要同時操作的saga
// export default function* rootSaga() {
//   yield all([helloSaga(), watchIncrementAsync()]);
// }
// -------------------------------------------------------------

/*
   也可以使用 takeLatest，來避免持續送同一種dispatch
   但不允許同時取得使用者。當一個 fetch 已經在 pending 時，如果取得 dispatch「USER_FETCH_REQUESTED」，
   正在等待的 fetch 會被取消，只執行最新的發出的 USER_FETCH_REQUESTED。
 */
//  function* mySaga() {
//    ("USER_FETCH_REQUESTED", fetchUser);
//  }

export default mySaga;

// other fetch sample
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
