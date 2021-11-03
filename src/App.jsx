import React, { useState, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {reduxFromOutFn}from './testFn'

import Home from "./pages/Home";
import Form from "./pages/Form";
import SuspenseTest from "./pages/SuspenseTest";
import ChartTest from "./pages/ChartTest";
import Geo from "./pages/GeoTest";
import logo from "./logo.svg";
import XstateRun from "./pages/XstateRun"
import "./App.css";
import { MemoizedTitle } from "./Title";
import { callApi, exampleThunkFunction } from "./actions/req";

const Test = React.lazy(() => import("./Test/index"));





function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(false);
  const [brickColor, setBrickColor] = useState(true);
  const scrollPos = useRef(null);

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

  const test = (e) => console.log({ e });

  const imgUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", (e) => test(e.target));
    input.click();
  };

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
    <>
      {/* 如果沒有使用exact的話，只要path有前面符合就會渲染該組件，例如path="/Message"的話，不論網址是http://localhost:8080/MessageList或http://localhost:8080/MessageList/Content都會當作符合而渲染組件。 */}
      <Suspense fallback={<div>Home loading...</div>}>
        <Route path="/home" component={Home} />
        <Route path="/form" component={Form} />
        <Route path="/sus" component={SuspenseTest} />
        <Route path="/chart-test" component={ChartTest} />
        <Route path="/geo" component={Geo} />
        <Route path="/xstate" component={XstateRun} />
      </Suspense>
       <Link to={'/sus'}>123</Link>
      {/* <Route path="/home" exact component={Home} /> */}
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
        <button
          onClick={() => {
            scrollPos.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
          }}
        >
          scroll
        </button>
        {/* <div style={{background:'black',width:'150px',height:'150px'}} onClick={imgUpload}></div> */}

        {/* action creator 可以回傳一個 function 來取代 action 物件。這樣的話，function creator 就變成一個 thunk。 */}

        {/* 當一個 action creator 回傳一個 function 的時候，這個 function 將會被 Redux Thunk middleware 執行。這個 function 不需要是 pure 的；因此它被允許一些有 side effect 的動作，包括執行非同步的 API 呼叫。這個 function 也可以 dispatch action—像是那些我們之前定義的同步 action。 */}
        <button onClick={() => dispatch(callApi("123"))}>
          call api dispatch
        </button>

        {/* 直接dispatch fn 可透過HOC的方式，取得dispatch, getState兩個fn */}
        <button onClick={() => dispatch(exampleThunkFunction)}>
          test Thunk
        </button>

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
              name: "jack",
            })
          }
        >
          saga effect test
        </button>

        <button
          onClick={() =>
            dispatch({
              type: "RUN_MULTIPLE",
            })
          }
        >
          run mutiple saga
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
          <div className="placeholder-item">
            <div style={{ width: "200px", height: "100px" }}></div>
          </div>
          <h1 ref={scrollPos}>{`Redux現在的數字是${counterFromRedux}`}</h1>
        </header>
        {reduxFromOutFn()}
      </div>
    </>
  );
}

export default App;
