import React from 'react';  
import { Formik, Form, Field, ErrorMessage } from 'formik';  
import validationSchema from './SignupSchema';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AxiosService from '../../utils/AxioService';
import ApiRoutes from '../../utils/Routes/ApiRoutes';


const Signup = () => { 
  
   let navigate = useNavigate();
    const styles = {
        label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
        field:
          'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
        button:
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center",  
        errorMsg: 'text-red-500 text-sm',
      }

    const initialValues = { 
      firstName:'',
      lastName:'',
      email: '', 
      password: '',
      phone:''
    };  

    const handleSubmit = async(values) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        // }, 400);
        console.log(values)
        
        try {
          let res = await AxiosService.post(`${ApiRoutes.SIGNUP.path}`,values
          ,{authenticate:ApiRoutes.SIGNUP.auth})
          if(res.status === 201){
              console.log(res.data.message)
              toast.success(res.data.message);
              navigate('/activelogin')
          }

      } catch (error) {
        
          toast.error(error.message)
      }
    }
    return <>
    <div className="flex items-center justify-center min-h-screen bg-[#b4b3dd]">  
            <div className="bg-white p-8 rounded-lg shadow-md w-96">  
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>  
        <Formik  
            initialValues={initialValues}  
            validationSchema={validationSchema}  
            onSubmit={handleSubmit}  
        >  {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <Form>
                 <label className={styles.label}>
                FirstName
                </label>
                <Field className={styles.field} id='firstName' name='firstName' />
                <ErrorMessage component='a' className={styles.errorMsg} name='firstName' />

                <label className={styles.label}>
                lastName
                </label>
                <Field className={styles.field} id='lastName' name='lastName' />
                <ErrorMessage component='a' className={styles.errorMsg} name='lastName' />


                <label className={styles.label} htmlFor='email'>
                Email
                </label>
                <Field className={styles.field} id='email' name='email' />
                <ErrorMessage component='a' className={styles.errorMsg} name='email' />
                
                <label className={styles.label} htmlFor='email'>
                Password
                </label>
                <Field className={styles.field} id='password' name='password' />
                <ErrorMessage
                component='a'
                className={styles.errorMsg}
                name='password'
                />

                <label className={styles.label} htmlFor='phone'>
                Phone number
                </label>
                <Field className={styles.field} id='phone' name='phone' />
                <ErrorMessage
                component='a'
                className={styles.errorMsg}
                name='phone'
                />
                
                <div className='mt-8 flex items-center justify-center'>
                  <button type='submit' className={styles.button}>
                      Register
                  </button>
                </div>

                <p className="text-center mt-4">
                        Already Registered?<span className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><Link to="/login">Sign In?</Link></span>
                </p>
            </Form>
          )}  
        </Formik>
        </div>
        </div>  
    </> 
};  

export default Signup;