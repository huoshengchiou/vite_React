// // way1
// function* fetchPosts() {
//     yield put(actions.requestPosts())
//     const products = yield call(fetchApi, '/products')
//     yield put(actions.receivePosts(products))
//   }

//   function* watchFetch() {
//     while (yield take(FETCH_POSTS)) {
//       yield call(fetchPosts) // 等待 fetchPosts task 終止
//     }
//   }

// //way2
//   function* mainSaga(getState) {
//     const results = yield all([call(task1), call(task2), ...])
//     yield put(showResults(results))
//   }

// //way3
//   function* game(getState) {
//     let finished
//     while (!finished) {
//       // 在 60 秒內完成
//       const {score, timeout} = yield race({
//         score: call(play, getState),
//         timeout: call(delay, 60000)
//       })

//       if (!timeout) {
//         finished = true
//         yield put(showScore(score))
//       }
//     }
//   }

//seperate effect from take
// const action = yield take(CHOOSE_NUMBER);
//   if (action.payload.number % 2 === 0) {
//     yield put(changeUI('red'));
//   } else {
//     yield put(changeUI('blue'));
//   }
