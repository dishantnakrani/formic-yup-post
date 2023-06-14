import './App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});


function App() {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {

      const formData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
      };

      console.log(formData);
      axios.post("https://jsonplaceholder.typicode.com/posts", { formData })

        .then((responce) => {
          console.log(responce);
          // setName('');
          // setSname('');
          resetForm();
        })

        .catch((error) => {
          console.log(error);
        })


      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);


    // axios.post("https://jsonplaceholder.typicode.com/posts", { data })

    //   .then((responce) => {
    //     console.log(responce);
    //     // setName('');
    //     // setSname('');
    //   })

    //   .catch((error) => {
    //     console.log(error);
    //   })




  };

  return (

    <div>
      <h1>Form</h1>
      <Formik
        initialValues={{ name: '', phone: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>


            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>

  );
}

export default App;
