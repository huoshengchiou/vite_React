import React from "react";
import {
  Formik,
  Field,
  Form,
  useFormik,
  FieldArray,
  ErrorMessage,
} from "formik";
import { Debug } from "./Debug";
import * as Yup from "yup";

const makeValidationSchema = () =>
  Yup.object({
    emailName: Yup.string().email("無效的 Email").required("email 為必填"),
  });

const Formtest = () => {
  //define error (original way)
  const validate = (values) => {
    const errors = {};
    console.log("validate", values);
    if (values.emailName.length <= 0) {
      errors.email = "need email";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { emailName: "" },
    // validate,
    //搭配Yup處理驗證顯示
    validationSchema: makeValidationSchema(),
    //在 onSubmit 時透過 `values` 物件取得表單中的內容
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  // name is mik value key
  return (
    <>
      <div>Form</div>
      <div className="form-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="emailId"
              name="emailName"
              type="text"
              onChange={formik.handleChange}
              //點過一次，再離開才觸發formik.touched.emailName為true
              onBlur={formik.handleBlur}
              value={formik.values.emailName}
            />

            {/* {formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null} */}
            {formik.errors.emailName ? (
              <div>{formik.errors.emailName}</div>
            ) : null}
            {formik.touched.emailName && formik.errors.emailName ? (
              <div>{formik.errors.emailName}</div>
            ) : null}
          </div>

          <input
            name="email2"
            type="text"
            //直接透過formik來註冊事件
            {...formik.getFieldProps("email2")}
          />
          <button type="submit">Submit</button>
        </form>
        表二
        <Formik
          // arr類資料取值name字串調整
          // <Field name="friends[0].email" type="email" placeholder="jane@example.com" /></div>
          initialValues={{ email: "", friends: [{ name: "", email: "" }] }}
          validationSchema={Yup.object({
            //array schema 為巢狀
            friends: Yup.array().of(
              Yup.object({
                name: Yup.string().required("Required"),
                email: Yup.string().email("Invalid Email").required("Required"),
              })
            ),
          })}
          onSubmit={(values) => {
            console.log(values);
            /* values to submit ... */
          }}
        >
          {(formik) => (
            <>
              <Form>
                <Field name="firstName" placeholder="Jane" />
                <FieldArray name="friends">
                  {({ push, remove }) => (
                    <>
                      {React.Children.toArray(
                        formik.values.friends &&
                          formik.values.friends.length > 0 &&
                          formik.values.friends.map((value, index) => (
                            <>
                              <Field
                                name={`friends[${index}].name`}
                                type="text"
                                placeholder="Jane Doe"
                              />
                              <ErrorMessage name={`friends[${index}].name`}>
                                {(msg) => <span>{msg}</span>}
                              </ErrorMessage>
                              <Field
                                name={`friends[${index}].email`}
                                type="email"
                                placeholder="jane@example.com"
                              />

                              {/* 使用 remove 移除陣列內的元素 */}
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </>
                          ))
                      )}

                      {/* 針對 FieldArray name="friends" 推一層資料結構*/}
                      <button
                        type="button"
                        onClick={() => push({ name: "", email: "" })}
                      >
                        Add Friend
                      </button>
                    </>
                  )}
                </FieldArray>
                <button type="submit">Submit</button>
                {/* //直接把form的結構資料顯示出來 */}
                {/* <Debug /> */}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Formtest;
