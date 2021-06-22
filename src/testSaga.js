// Now the saga under test will put two DO_STUFF actions before waiting for a CHOOSE_NUMBER action and then putting either changeUI('red') or changeUI('blue'), depending on whether the number is even or odd.
function* doStuffThenChangeColor() {
  yield put(doStuff());
  yield put(doStuff());
  const action = yield take(CHOOSE_NUMBER);
  if (action.payload.number % 2 === 0) {
    yield put(changeUI("red"));
  } else {
    yield put(changeUI("blue"));
  }
}

//   import { put, take } from 'redux-saga/effects';
// import { cloneableGenerator } from 'redux-saga/utils';

// test('doStuffThenChangeColor', assert => {
//   const gen = cloneableGenerator(doStuffThenChangeColor)();
//   gen.next(); // DO_STUFF
//   gen.next(); // DO_STUFF
//   gen.next(); // CHOOSE_NUMBER

//   assert.test('user choose an even number', a => {
//     // cloning the generator before sending data
//     const clone = gen.clone();
//     a.deepEqual(
//       clone.next(chooseNumber(2)).value,
//       put(changeUI('red')),
//       'should change the color to red'
//     );

//     a.equal(
//       clone.next().done,
//       true,
//       'it should be done'
//     );

//     a.end();
//   });

//   assert.test('user choose an odd number', a => {
//     const clone = gen.clone();
//     a.deepEqual(
//       clone.next(chooseNumber(3)).value,
//       put(changeUI('blue')),
//       'should change the color to blue'
//     );

//     a.equal(
//       clone.next().done,
//       true,
//       'it should be done'
//     );

//     a.end();
//   });
// });

// full test saga
function* callApi(url) {
  const someValue = yield select(somethingFromState);
  try {
    const result = yield call(myApi, url, someValue);
    yield put(success(result.json()));
    return result.status;
  } catch (e) {
    yield put(error(e));
    return -1;
  }
}
// -----------------------------------
// const dispatched = [];

// const saga = runSaga({
//   dispatch: (action) => dispatched.push(action);
//   getState: () => ({ value: 'test' });
// }, callApi, 'http://url');
// -----------------------------------
//   import sinon from 'sinon';
// import * as api from './api';

// test('callApi', async (assert) => {
//   const dispatched = [];
//   sinon.stub(api, 'myApi').callsFake(() => ({
//     json: () => ({
//       some: 'value'
//     })
//   }));
//   const url = 'http://url';
//   const result = await runSaga({
//     dispatch: (action) => dispatched.push(action),
//     getState: () => ({ state: 'test' }),
//   }, callApi, url).done;

//   assert.true(myApi.calledWith(url, somethingFromState({ state: 'test' })));
//   assert.deepEqual(dispatched, [success({ some: 'value' })]);
// });
