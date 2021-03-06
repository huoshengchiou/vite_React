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



//自定義component
const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div style={{border:'1px solid red'}}>
    <input type="text" {...field} {...props} />
    {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);






const makeValidationSchema = () =>
  Yup.object({
    emailName: Yup.string().email("無效的 Email").required("email 為必填"),
  });

const Formtest = () => {



  const yupTest=async()=>{

    let schema =  Yup.object({
      isSpecial: Yup.boolean(),
      isBig: Yup.boolean(),
      count: Yup.number().when(['isBig', 'isSpecial'], {
        // is:  (isBig, isSpecial) => isBig && isSpecial,
        is:  true,
        then: Yup.number().min(5),
        otherwise: Yup.number().min(0),
      }),
    });
    
    const result=await schema.isValid({
      isBig: true,
      isSpecial: false,
      count: 4,
    })
    console.log({result})

  }

  // yupTest()


  const yupArrayTest=async()=>{

    let schema =  Yup.object({
      friends: Yup.array().transform(function (value, originalvalue) {
        console.log({value, originalvalue})
        return value
      })
    });
    
    const result=await schema.isValid({
      friends:[{name:'jack',age:14}]
    })
    console.log({result})

  }

  // yupArrayTest()


  //define error (original way)
  const validate = (values) => {
    const errors = {};
    console.log("validate", values);
    if (values.emailName.length <= 0) {
      errors.email = "need email";
    }
    return errors;
  };

  // style={{border:`1px solid ${meta.touched && meta.error&&'red'}`}}

  const MyInput = ({ field, form, ...props }) => {
    const {name}=field
    const {errors,touched}=form
    console.log({field, form,...props})
    return <input {...field} {...props} style={{border:`1px solid ${errors[name]&&'red'}`}}/>;
  };



  const MyRadio=({ field, form, ...props }) => {
    const {name}=field
    const {errors,touched,setFieldValue}=form
    return <input {...field} {...props} style={{border:`1px solid ${errors[name]&&'red'}`}}/>;
  };


  
  const MyCheck=({ field, form, ...props }) => {
    const {name}=field
    const {errors,touched,setFieldValue,isValid}=form
    return <><input {...field} {...props} style={{border:`1px solid ${errors[name]&&'red'}`}}/><sapn>{!isValid&&'error'}</sapn></>;
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
          initialValues={{ email: "", friends: [{ name: "", email: "" }],file:null,file1:'',customName:'',touchInput:'',dirty:[],color:'',picked:'',myInput:'',checked:[] }}
          validationSchema={Yup.object({
            //array schema 為巢狀
            friends: Yup.array().of(
              Yup.object({
                name: Yup.string().required("Required").min(2, 'Too Short!'),
                email: Yup.string().email("Invalid Email").required("Required"),
               
              })
            ),
            //required()內可以自定義錯誤字串 min()則是在第二個參數 
            touchInput:Yup.string().required('error on touch').min(2, 'Too Short!'),
            picked:Yup.string().required("Required"),
            myInput:Yup.string().required("Required"),
            color:Yup.string().required("Required"),
            checked:Yup.array().min(1,"Required")
          })}
          onSubmit={(values) => {
            console.log(values);
            /* values to submit ... */
          }}
        >
          {(formik) => (
            <>
              <Form>
                {console.log({formik})}
                <Field name="myInput" placeholder="Doe" component={MyInput} />
                <Field name="firstName" placeholder="Jane" />
                {/* 選單類型 */}
                <Field as="select" name="color">
             <option value="red">Red</option>
             <option value="green">Green</option>
             <option value="blue">Blue</option>
           </Field>
           <Field name="customName" component={CustomInputComponent} placeholder="customName"/>
           <Field type="radio" name="picked" value="One" />
           <Field type="radio" name="picked" value="Three" component={MyRadio} />

           <Field type="radio" name="picked" value="Two" />

           <div role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="checked" value="One" component={MyCheck}/>
              One
            </label>
            <label>
              <Field type="checkbox" name="checked" value="Two" />
              Two
            </label>
            <label>
              <Field type="checkbox" name="checked" value="Three" />
              Three
            </label>
          </div>


           <Field name="touchInput" />
           {/* 加入touched後，會在游標離開該處後進行驗證顯示錯誤 */}
           {formik.errors.touchInput && formik.touched.touchInput ? (
             <div>{formik.errors.touchInput}</div>
           ) : null}
          

                <input  name="file" type="file" onChange={(event) => {
                  console.log({upload:event.currentTarget.files[0]})
                 formik.setFieldValue("file", event.currentTarget.files[0]);
                 formik.setFieldValue("file1", event.currentTarget.files[0].name);
                }} />
                {formik.values.file1}
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
                                onBlur={(e)=>{
                                  //同時setting兩個值
                                  e.currentTarget.value.trim()===''? formik.setFieldValue(`dirty[${index}]`,'c'):formik.setFieldValue(`dirty[${index}]`,index)
                                  
                                }}
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
                <div style={{position:'fixed',top:'250px',background:'white'}}>
                <Debug />

                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Formtest;
