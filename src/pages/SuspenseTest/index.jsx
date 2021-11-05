import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Todo from "./Todo";

function* numG() {
  let num = 0;

  while (true) {
    yield num;

    num++;
  }
}
const SuspenseTest = () => {
  const a = numG();

  useEffect(() => {
    console.log(a.next());
  }, []);
  return (
    <>
      SuspenseTest
      <Suspense fallback={<h1>Loading in sus...</h1>}>
        <Todo />
      </Suspense>
      <Link to={"/"}>123</Link>
    </>
  );
};

export default SuspenseTest;
