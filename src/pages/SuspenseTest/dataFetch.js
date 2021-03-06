const getTodos = () =>
  fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
    response.json()
  );

console.log(getTodos);

const suspend = (promise) => {
  let result;
  let status = "pending";
  const suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw result;
      default:
        return result;
    }
  };
};

export default suspend(getTodos());
