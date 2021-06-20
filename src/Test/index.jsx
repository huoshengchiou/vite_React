import React, { useEffect,useState,Suspense } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => setData(() => 1), 3000);
    return () => {};
  }, []);

  if (!data) null;
  return (
    <>

      <div>test</div>
      <div>
        data: <span>{data}</span>
      </div>
    </>
  );
};

export default Test;
