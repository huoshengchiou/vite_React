import { useSelector, useDispatch } from "react-redux";

export const reduxFromOutFn = () => {
  const counterFromRedux = useSelector((storeState) => storeState);
  console.log("test", counterFromRedux);
};
