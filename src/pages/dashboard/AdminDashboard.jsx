import React, { useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { setBooks } from '../../components/Redux/Book/bookSlice';  
import BookCard from './BookCard'; // Create a separate component for each book  
import AxiosService from '../../utils/AxioService';
import ApiRoutes from '../../utils/Routes/ApiRoutes';

const Dashboard = () => {  
    const dispatch = useDispatch();  
    const books = useSelector((state) => state.books);  
    const userId = sessionStorage.getItem('id');

    const fetchBooks = async() => {
      try {  
        let res = await AxiosService.get(`${ApiRoutes.GET_ALL_BOOKS.path}`, { authenticate: ApiRoutes.GET_ALL_BOOKS.auth });  
        if (res.status === 200) {     
            dispatch(setBooks(res.data.data));
        }  
      } catch (error) {  
        toast.error(error.response.data.message);  
      }  
    }
    

    useEffect(() => {    
       fetchBooks();  
    }, [dispatch]);  

    return (  
        <div className="container mx-auto p-4">  
            <h1 className="text-3xl font-bold mb-4">Book Dashboard</h1>  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
                {books.map(book => (  
                    <BookCard key={book.bookID} book={book} userId={userId} />  
                ))}  
            </div>  
        </div>  
    );  
};  

export default Dashboard;