import { take, call, put, cancelled } from "redux-saga/effects";

// function* authorize(user, password) {
//   try {
//     const token = yield call(Api.authorize, user, password);
//     yield put({ type: "LOGIN_SUCCESS", token });
//     return token;
//   } catch (error) {
//     yield put({ type: "LOGIN_ERROR", error });
//   }
// }

// // Root saga
// function* loginFlow() {
//   while (true) {
//     const { user, password } = yield take("LOGIN_REQUEST");
//     const token = yield call(authorize, user, password); //collected from UI
//     if (token) {
//       yield call(Api.storeItem, { token });
//       yield take("LOGOUT");
//       yield call(Api.clearItem, "token");
//     }
//   }
// }

// 正確處理
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({ type: "LOGIN_SUCCESS", token });
    yield call(Api.storeItem, { token });
  } catch (error) {
    yield put({ type: "LOGIN_ERROR", error });
  } finally {
    if (yield cancelled()) {
      // 在 finally 區塊可以取消 task 或處理任何的取消邏輯（以及任何其他類型的完成）。因為最後區塊執行在完成的任何類型（正常的回傳、錯誤、或強制取消）
      // ... 在這裡放置特殊的取消操作程式碼
    }
  }
}

//為了取消一個被 fork 的 task，使用一個專屬的  cancel Effect
function* loginFlow() {
  while (true) {
    const { user, password } = yield take("LOGIN_REQUEST");
    const task = yield fork(authorize, user, password); //即使沒有執行完，仍然可以接收下方disaptch tag，而不是因為阻塞跳過
    const action = yield take(["LOGOUT", "LOGIN_ERROR"]);
    if (action.type === "LOGOUT") {
      // yield fork 結果在一個 Task 物件。我們將回傳的物件分配到 local 常數 task。之後如果我們接收一個 LOGOUT action，我們傳送 task 到 cancel Effect。如果 task 持續執行，它將被中止。如果 task 已經完成，不會發生任何事情，取消操作的結果將是一個空操作（no-op）。最後，如果 task 完成後有錯誤，我們不會做任何事情，因為我們知道 task 已經完成。
      yield cancel(task);
    }
    yield call(Api.clearItem, "token");
  }
}

// bgSyncTask 的取消將造成 Generator 跳到 finally 的區塊。這裡你可以使用 yield cancelled() 來確認 Generator 是否被取消了。
