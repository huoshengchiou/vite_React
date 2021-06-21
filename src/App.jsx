import React, { useState, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import { MemoizedTitle } from "./Title";
import { callApi, exampleThunkFunction } from "./actions/req";

const Test = React.lazy(() => import("./Test/index"));

function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(false);
  const [brickColor, setBrickColor] = useState(true);

  const counterFromRedux = useSelector((storeState) => storeState.counter); //取其中一個
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const handleClick = (lang) => {
    console.log(t);
    i18n.changeLanguage(lang);
  };

  // useEffect(() => {
  //   //重要的key必須透過.env檔保存並且不會進到版控
  //   axios.get(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=London&aqi=no`).then(payload=>console.log('r',payload)).catch(err=>consle.log(err))
  // }, [])

  // function MyComponent() {
  //   return (
  //     // Displays <Spinner> until OtherComponent loads
  //     <React.Suspense fallback={<Spinner />}>
  //       <div>
  //         <OtherComponent />
  //       </div>
  //     </React.Suspense>
  //   );
  // }

  //變數在內部
  const CustomDiv = styled.div`
    width: 100px;
    height: 100px;
    background: ${() => (brickColor ? "teal" : "red")};
  `;

  const ExtendDiv = styled(CustomDiv)`
    background: blue;
  `;

  return (
    <div className="App">
      {React.Children.toArray(
        ["en", "ko", "chi"].map((lang) => (
          <button onClick={() => handleClick(lang)}>{lang}</button>
        ))
      )}
      <button onClick={() => setBrickColor((pre) => !pre)}>
        switch brick color
      </button>
      <button onClick={() => setColor((pre) => !pre)}>color</button>
      <button onClick={() => setData((pre) => [1, ...pre])}>data</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        dispatch by +
      </button>

      {/* action creator 可以回傳一個 function 來取代 action 物件。這樣的話，function creator 就變成一個 thunk。 */}

      {/* 當一個 action creator 回傳一個 function 的時候，這個 function 將會被 Redux Thunk middleware 執行。這個 function 不需要是 pure 的；因此它被允許一些有 side effect 的動作，包括執行非同步的 API 呼叫。這個 function 也可以 dispatch action—像是那些我們之前定義的同步 action。 */}
      <button onClick={() => dispatch(callApi("123"))}>
        call api dispatch
      </button>

      {/* 直接dispatch fn 可透過HOC的方式，取得dispatch, getState兩個fn */}
      <button onClick={() => dispatch(exampleThunkFunction)}>test Thunk</button>

      <button
        onClick={() =>
          dispatch({ type: "USER_FETCH_REQUESTED", payload: { userId: 123 } })
        }
      >
        saga dispatch
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "USER_FETCH_REQUESTED_LATEST",
            payload: { userId: 123 },
          })
        }
      >
        saga LATEST dispatch
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "LOGIN",
          })
        }
      >
        saga effect test
      </button>

      <h1 style={{ color: color ? "red" : "blue" }}>color</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t("Thanks.1")}</p>
        <p>{t("why.1")}</p>
        {/* 引入component還沒有ready前的過場 */}
        <Suspense fallback={<div>loading...123.</div>}>
          <Test />
        </Suspense>
        標題這裡
        <MemoizedTitle title={count} data={data} />
        <CustomDiv />
        <ExtendDiv />
        <h1>{`Redux現在的數字是${counterFromRedux}`}</h1>
      </header>
    </div>
  );
}

export default App;
