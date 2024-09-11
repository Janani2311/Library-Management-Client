import React from 'react';  
import { Formik, Form, Field, ErrorMessage } from 'formik';   
import Feed from '../../components/common/Feed';  
import validationSchema from './AddbookSchema';  
import FileUpload from '../../components/common/FileUpload';  
import AxiosService from '../../utils/AxioService';  
import toast from 'react-hot-toast';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import { useDispatch } from 'react-redux';  
import { addBook } from '../../components/Redux/Book/bookSlice';  

const AddBooks = () => {  
    const dispatch = useDispatch();  
    const styles = {  
      label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',  
      field: 'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',  
      button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center",  
      errorMsg: 'text-red-500 text-sm',  
    };  

    const initialValues = {  
      title: "",  
      author: "",  
      description: "",  
      image: "/books/dummy.jpeg",  
      isbn: "",  
      publishedDate: "",  
      publisher: "",  
      pageCount: 1,  
      language: "",  
      genre: "",  
      numBooksAvailable: 1  
    };  

    const handleSubmit = async (values) => {  
        try {  
            let res = await AxiosService.post(`${ApiRoutes.ADD_BOOKS.path}`, values, { authenticate: ApiRoutes.ADD_BOOKS.auth });  
            if (res.status === 201) {  
                toast.success(res.data.message);  
                dispatch(addBook(res.data.book));  
            }  
        } catch (error) {  
            toast.error(error);  
        }  
    };  

    return (  
        <div id="content-wrapper" className="d-flex flex-column w-full px-4 flex-1">  
            <div id="content">  
                <div className="container-fluid">  
                    <Formik  
                        initialValues={initialValues}  
                        validationSchema={validationSchema}  
                        onSubmit={handleSubmit}  
                    >  
                        {({ values }) => (  
                            <div className="flex flex-col md:flex-row flex-nowrap w-full">  
                                <div className='w-full md:w-1/3 p-4'>  
                                    <h1 className="font-sans text-3xl hover:subpixel-antialiased font-weight:600 text-sky-800">Add Book</h1>  
                                    <Form>  
                                        {['title', 'author', 'description', 'isbn', 'publishedDate', 'publisher', 'pageCount', 'language', 'genre', 'numBooksAvailable'].map((field) => (  
                                            <div key={field}>  
                                                <label className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>  
                                                <Field className={styles.field} id={field} name={field} as={field === 'description' ? 'textarea' : undefined} />  
                                                <ErrorMessage component='div' className={styles.errorMsg} name={field} />  
                                            </div>  
                                        ))}  
                                        <Field className={styles.field} id='image' name='image' component={FileUpload} />  
                                        
                                        <div className='mt-8 flex items-center justify-center'>  
                                            <button type='submit' className={styles.button}>  
                                                Add this book  
                                            </button>  
                                        </div>  
                                    </Form>  
                                </div>  
                                <div className='w-full md:w-2/3 p-4'>  
                                    <div className='preview-wrapper mt-5 w-full px-4 flex-1'>  
                                        <h1 className="font-sans text-3xl hover:subpixel-antialiased font-weight:600 text-sky-800 text-center">Preview Book</h1>  
                                        <Feed formData={values} />  
                                    </div>  
                                </div>  
                            </div>  
                        )}  
                    </Formik>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default AddBooks;




// import React, { useState } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'; 
// import Feed from '../../components/common/Feed';
// import validationSchema from './AddbookSchema';
// import FileUpload from '../../components/common/FileUpload';
// import AxiosService from '../../utils/AxioService';
// import toast from 'react-hot-toast';
// import ApiRoutes from '../../utils/Routes/ApiRoutes';
// import { useDispatch } from 'react-redux';
// import { addBook } from '../../components/Redux/Book/bookSlice';


// const AddBooks = () => {
//     const dispatch = useDispatch();
//     const styles = {
//       label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
//       field:
//         'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
//       button:
//         "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center",  
//       errorMsg: 'text-red-500 text-sm',
//     }

//     const initialValues = {
//       title: "",
//       author:"",
//       description:"",
//       image:"/books/dummy.jpeg",
//       isbn:"",
//       publishedDate:"",
//       publisher:"",
//       pageCount:1,
//       language:"",
//       numBooksAvailable:1
//     }


//       const handleSubmit = async(values) => {
          
//          try {
//           let res = await AxiosService.post(`${ApiRoutes.ADD_BOOKS.path}`, values, {authenticate:ApiRoutes.ADD_BOOKS.auth})
//           if(res.status === 201){
//             toast.success(res.data.message)
//             console.log(res.data.book)
//             dispatch(addBook(res.data.book))
//           }
//          } catch (error) {
//           toast.error(error)
//          }
//     }

//   return <> 
//       <div id="content-wrapper" className="d-flex flex-column w-full px-4 flex-1">
//             <div id="content">
//             <div className="container-fluid">
                
//               <Formik  
//                       initialValues={initialValues}  
//                       validationSchema={validationSchema}  
//                       onSubmit={handleSubmit}  
//                   >  {({values}) => (
//                     <div className="flex flex-col  md:flex-row flex-nowrap w-full">
//                       <React.Fragment>
//                       <div className='w-full md:w-1/3 p-4'>
//                       <div className="d-sm-flex align-items-center justify-content-between mt-5">
//                         <h1 className="font-sans text-3xl hover:subpixel-antialiased font-weight:600 text-sky-800">Add Book</h1>
//                       </div>
//                       <Form>

//                       {['title', 'author', 'description', 'isbn', 'publishedDate', 'publisher', 'pageCount', 'language', 'genre', 'numBooksAvailable'].map((field) => (  
//                           <React.Fragment key={field}>  
//                               <label className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>  
//                               <Field className={styles.field} id={field} name={field} as={field === 'description' ? 'textarea' : undefined} />  
//                               <ErrorMessage component='div' className={styles.errorMsg} name={field} />  
//                           </React.Fragment>  
//                       ))}  
//                           <label className={styles.label}>
//                           Title
//                           </label>
//                           <Field className={styles.field} id='title' name='title' 
//                           />
//                           <ErrorMessage component='div' className={styles.errorMsg} name='title' />
                            

//                           <label className={styles.label}>
//                           Author
//                           </label>
//                           <Field className={styles.field} id='author' name='author'
//                           />
//                           <ErrorMessage component='div' className={styles.errorMsg} name='author' />


//                           <label className={styles.label}>
//                           Description
//                           </label>
//                           <Field as="textarea" className={styles.field} id='description' name='description'
//                               />
//                           <ErrorMessage component='div' className={styles.errorMsg} name='description' />
                          
                         
//                           <Field className={styles.field} id='image' name='image' component={FileUpload}
//                          />
//                           {/* <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='image'
//                           /> */}

//                           <label className={styles.label}>
//                           ISBN
//                           </label>
//                           <Field className={styles.field} id='isbn ' name='isbn' 
//                          />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='isbn'
//                           />
                          
//                           <label className={styles.label}>
//                           Published Date
//                           </label>
//                           <Field className={styles.field} id='publishedDate' name='publishedDate' 
//                            />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='publishedDate'
//                           />

//                           <label className={styles.label}>
//                           Publisher
//                           </label>
//                           <Field className={styles.field} id='publisher' name='publisher' 
//                            />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='publisher'
//                           />

//                           <label className={styles.label}>
//                           Page Count
//                           </label>
//                           <Field className={styles.field} id='pageCount' name='pageCount' 
//                            />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='pageCount'
//                           />

//                           <label className={styles.label}>
//                           Language
//                           </label>
//                           <Field className={styles.field} id='language' name='language' 
//                            />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='language'
//                           />

//                           <label className={styles.label}>
//                           Genre
//                           </label>
//                           <Field className={styles.field} id='genre' name='genre' 
//                            />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='genre'
//                           />

//                           <label className={styles.label}>
//                           No of Books available
//                           </label>
//                           <Field className={styles.field} id='numBooksAvailable' name='numBooksAvailable' 
//                            />
//                           <ErrorMessage
//                           component='div'
//                           className={styles.errorMsg}
//                           name='numBooksAvailables'
//                           />
//                           <div className='mt-8 flex items-center justify-center'>
//                             <button type='submit' className={styles.button}>
//                                 Add this book
//                             </button>
//                           </div>
                        
                          
//                       </Form>
//                   </div>
//                       <div className='w-full md:w-2/3 p-4'>
//                         <div className='preview-wrapper mt-5 w-full px-4 flex-1'>
//                         <h1 className="font-sans text-3xl hover:subpixel-antialiased font-weight:600 text-sky-800 text-center">Preview Book</h1>
//                             <Feed formData={values}/>
//                         </div>
//                       </div>
//                       </React.Fragment>
//                   </div>
//                     )}  
//                   </Formik>
          
//         </div>
//     </div>
//       </div>
//   </>
// }

// export default AddBooks