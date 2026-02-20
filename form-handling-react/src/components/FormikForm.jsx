import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 chars")
      .required("Password required"),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Submitting:", values);

        fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("API Response:", data);
            resetForm();
          });
      }}
    >
      <Form>
        <h2>Register (Formik)</h2>

        <Field name="username" placeholder="Username" />
        <ErrorMessage name="username" component="p" />

        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" component="p" />

        <Field name="password" type="password" placeholder="Password" />
        <ErrorMessage name="password" component="p" />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}