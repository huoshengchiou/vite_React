import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// redux core //store as globalized state
import { createStore, applyMiddleware } from "redux";
//link redux with react state system
import { Provider } from "react-redux";
import allReducers from "./reducers";

//middlewares
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";
//intl
import "./i18n"; //注入主要的js
import App from "./App";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();

//collect middlewares
const middlewares = [thunk, sagaMiddleware];

const customMiddlewares = () => {
  //logger
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      console.log("will dispatch", action);
      console.log("state before dispatch", getState()); //preState

      // 呼叫在 middleware 鏈的下一個 dispatch method。
      let returnValue = next(action); //執行Next後，action會抵達store
      //  next(action)
      console.log("state after dispatch", getState()); //updatedState
      return returnValue;
    };
};

// for other bundle process.env.NODE_ENV??
if (import.meta.env.MODE === "development") {
  middlewares.push(createLogger());
  // middlewares.push(customMiddlewares())
}

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //透過redux-devtools-extension來複合使用middle ware

//createStore only accept one reducer  //如果使用一個以上 Middleware，redux-logger 一定要放在最後執行
const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Suspense fallback={<div>loading....</div>}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);

// function createThunkMiddleware(extraArgument) {
//   // 這是 middleware 基本的寫法
//   return ({ dispatch, getState }) =>
//     (next) =>
//     (action) => {
//       // action 就是透過 action creators 傳進來的東西，
//       // 在 redux-thunk 中會是 async function
//       if (typeof action === "function") {
//         // 在這裡回傳「執行後的 async function」
//         return action(dispatch, getState, extraArgument);
//       }

//       // 如果傳進來的 action 不是 function，則當成一般的 action 處理
//       return next(action);
//     };
// }

// const thunk = createThunkMiddleware();
// thunk.withExtraArgument = createThunkMiddleware;

// export default thunk;
