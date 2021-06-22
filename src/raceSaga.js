// need only one winner
import { race, take, put } from "redux-saga/effects";
import { delay } from "redux-saga";

function* fetchPostsWithTimeout() {
  const { posts, timeout } = yield race({
    posts: call(fetchApi, "/posts"),
    timeout: call(delay, 1000),
  });

  if (posts) {
    put({ type: "POSTS_RECEIVED", posts });
  } else {
    put({ type: "TIMEOUT_ERROR" });
  }
}

function* backgroundTask() {
  while (true) {
    //    背景程式
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take("START_BACKGROUND_TASK");
    yield race({
      task: call(backgroundTask),
      cancel: take("CANCEL_TASK"), //dispatch CANCEL_TASK 會自動取消掉另外的task
    });
  }
}
