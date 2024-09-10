import * as Yup from 'yup';  

const validationSchema = Yup.object({ 
    title: Yup.string().required('title is required'),
    description: Yup.string().required('please provide the description'),
    isbn: Yup.number().required('ISBN number Required'),  
    publishedDate: Yup
    .string()
    .required("Start date is required")
    .matches(
      /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
      "Date must be in MM/DD/YYYY format"
    ),
    publisher:Yup.string().required('Please enter the publisher Name'),
    pageCount:Yup.number().required('Please enter the page count'),
    genre:Yup.string().required('Please enter the genre'),
    numBooksAvailable:Yup.number().required('Please enter the number of books available')
});  

export default validationSchema;