import React, { Suspense } from "react";
import Todo from "./Todo";

const SuspenseTest = () => {
  return (
    <>
      SuspenseTest
      <Suspense fallback={<h1>Loading in sus...</h1>}>
        <Todo />
      </Suspense>
    </>
  );
};

export default SuspenseTest;
