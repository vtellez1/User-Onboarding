import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status}) => {

     const [users, setUsers] = useState([]);

     useEffect(() => {
        status && setUsers(users => [...users, status]);
      }, [status]);

    return (
      <div className="user-form">
          <Form>
            <Field type="text" name="name" placeholder="Name"/>
            {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
            )}

            <Field type="email" name="email" placeholder="Email"/>
            {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
            )}

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (
             <p className="errors">{errors.password}</p>
            )}

            <label className="checkbox-container"> I agree with the Terms of Service
            <Field required type="checkbox" name="termsofservice" checked={values.vaccinations}/>
            </label>
            <button>Submit</button>
          </Form>

        {users.map(user => (
        <ul key={user.id}>
          <li>Species: {user.name}</li>
          <li>Size: {user.email}</li>
          <li>Size: {user.password}</li>
        </ul>
      ))}
      </div>
    );
  };

  const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsofservice}) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        termsofservice: termsofservice || false,
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("We need to know your name, dude!"),
      email: Yup.string().required("Email is necessary, yo!"),
      password: Yup.string().min(8, "Password must be 8 characters or longer").required(),
      
    }),
    handleSubmit(values, { setStatus }) {
      // values is our object with all our data on it
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm);
  export default FormikUserForm;
  console.log("This is the HOC", FormikUserForm);
  
 //export default UserForm;