import React, { useEffect, useState } from 'react';  
import { Formik, Form, Field, ErrorMessage } from 'formik';   
import validationSchema from './AddbookSchema';  
import FileUpload from '../../components/common/FileUpload';  
import AxiosService from '../../utils/AxioService';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import toast from 'react-hot-toast';  
import formatDate from '../../components/common/DateFormat';  
import { useDispatch } from 'react-redux';  
import { updateBook } from '../../components/Redux/Book/bookSlice';  

function UpdationForm({ bookID }) {  
    const [originalData, setOriginalData] = useState(null);  
    const dispatch = useDispatch();  

    const initialValues = {  
        title: "",  
        author: "",  
        description: "",  
        image: "",  
        isbn: "",  
        publishedDate: "",  
        publisher: "",  
        pageCount: 1,  
        language: "",  
        numBooksAvailable: 1,  
    };  

    const styles = {  
        label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',  
        field: 'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',  
        button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center",  
        errorMsg: 'text-red-500 text-sm',  
    };  

    const handleSubmit = async (values) => {  
        const updatedValues = {};  

        for (const key in values) {  
            if (originalData && originalData[key] !== values[key]) {  
                updatedValues[key] = values[key];  
            }  
        }  

        if (Object.keys(updatedValues).length > 0) {  
            try {  
                const res = await AxiosService.patch(  
                    `${ApiRoutes.UPDATE_BOOK_BY_ID.path}/${bookID}`,  
                    updatedValues 
                );  

                if (res.status === 200) {  
                    toast.success(res.data.message);  
                    dispatch(updateBook({ id: bookID, ...res.data.data }));  
                }  
            } catch (error) {  
                console.error("Error updating book data:", error);  
                toast.error(error.message);  
            }  
        } else {  
            toast.error('No changes detected to update.');  
        }  
    }  

    const fetchBookData = async (bookID, setFieldValue) => {  
        try {  
            const res = await AxiosService.get(`${ApiRoutes.GET_BOOK_BY_ID.path}/${bookID}`, {  
                headers: { authenticate: ApiRoutes.GET_USER_BY_ID.auth }  
            });  

            if (res.status === 200) {  
                const data = res.data.data;  
                setOriginalData(data);  
                // Populate form with fetched data  
                for (const key in data) {  
                    if (data.hasOwnProperty(key)) {  
                        if (key === 'publishedDate') {  
                            setFieldValue(key, formatDate(data[key]));  
                        } else {  
                            setFieldValue(key, data[key]);  
                        }  
                    }  
                }  
            }  
        } catch (error) {  
            console.error("Error fetching book data:", error);  
        }  
    };   

    return (  
        <div id="content-wrapper" className="d-flex flex-column w-full px-4 flex-1">  
            <div id="content">  
                <div className="container-fluid">  
                    <div className="mb-2">  
                        <h2 className='font-sans text-2xl font-extrabold text-[#4e73df]'>Update Form</h2>  
                    </div>  
                    <Formik  
                        initialValues={initialValues}  
                        validationSchema={validationSchema}  
                        onSubmit={handleSubmit}  
                    >  
                        {({ values, setFieldValue }) => {  
                            useEffect(() => {  
                                if (bookID) {  
                                    fetchBookData(bookID, setFieldValue);  
                                }  
                            }, [bookID, setFieldValue]);  
                            
                            return (  
                                <Form>  
                                    <div className="flex flex-col">  
                                        <div className='p-4'>  
                                            <label className={styles.label}>Title</label>  
                                            <Field className={styles.field} id='title' name='title' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='title' />  

                                            <label className={styles.label}>Author</label>  
                                            <Field className={styles.field} id='author' name='author' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='author' />  

                                            <label className={styles.label}>Description</label>  
                                            <Field as="textarea" className={styles.field} id='description' name='description' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='description' />  

                                            <label className={styles.label}>Image</label>  
                                            <Field className={styles.field} id='image' name='image' component={FileUpload} />  
                          
                                            {/* <ErrorMessage component='div' className={styles.errorMsg} name='image' /> */}  

                                            <label className={styles.label}>ISBN</label>  
                                            <Field className={styles.field} id='isbn' name='isbn' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='isbn' />  

                                            <label className={styles.label}>Published Date</label>  
                                            <Field className={styles.field} id='publishedDate' name='publishedDate' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='publishedDate' />  

                                            <label className={styles.label}>Publisher</label>  
                                            <Field className={styles.field} id='publisher' name='publisher' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='publisher' />  

                                            <label className={styles.label}>Page Count</label>  
                                            <Field className={styles.field} id='pageCount' name='pageCount' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='pageCount' />  

                                            <label className={styles.label}>Language</label>  
                                            <Field className={styles.field} id='language' name='language' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='language' />  

                                            <label className={styles.label}>No of Books Available</label>  
                                            <Field className={styles.field} id='numBooksAvailable' name='numBooksAvailable' />  
                                            <ErrorMessage component='div' className={styles.errorMsg} name='numBooksAvailable' />  

                                            <div className='mt-8 flex items-center justify-center'>  
                                                <button type='submit' className={styles.button}>  
                                                    Update  
                                                </button>  
                                            </div>  
                                        </div>  
                                    </div>  
                                </Form>  
                            );  
                        }}  
                    </Formik>  
                </div>  
            </div>  
        </div>  
    );  
}  

export default UpdationForm;
