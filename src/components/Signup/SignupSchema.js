import * as Yup from 'yup';  

const validationSchema = Yup.object({ 
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('last name is required'),
    email: Yup.string().email('Invalid email format').required('Required'),  
    password: Yup.string().min(4, 'Must be at least 4 characters').required('Required'),
    phone:Yup.number().required('Please enter your phone number')
});  

export default validationSchema;