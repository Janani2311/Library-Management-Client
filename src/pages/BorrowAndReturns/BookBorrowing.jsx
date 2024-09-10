import React, { useEffect, useState } from 'react';    
import { useDispatch, useSelector } from 'react-redux';  
import { borrowBook, reserveBook, setBorrowedBooks } from '../../components/Redux/Library/librarySlice';  
import { updateAvailabilityStatus } from '../../components/Redux/Book/bookSlice';   
import AxioService from './../../utils/AxioService';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import toast from 'react-hot-toast';  

const BookBorrowing = () => {  
    const dispatch = useDispatch();  
    const books = useSelector((state => state.books));  
     
    const [reservedBooks, setReservedBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]); 
    
    const userId = sessionStorage.getItem('id');  

    const fetchBorrowedBooks = async () => {  
        try {  
            const res = await AxioService.get(ApiRoutes.GET_ALL_BORROWED_BOOKS.path, { authenticate: ApiRoutes.GET_ALL_BORROWED_BOOKS.auth });  
            if (res.status === 200) {  
                const userBorrowedBooks = res.data.data.filter(book => book.userId === userId);  
                // dispatch(setBorrowedBooks(userBorrowedBooks));
                 setBorrowedBooks(userBorrowedBooks)
            }  
        } catch (error) {  
            console.error('Error fetching borrowed books:', error);  
        }  
    };  

    const handleBorrowBook = async (bookID) => {  
        try {  
            const res = await AxioService.post(`${ApiRoutes.ADD_BORROW_BOOK.path}`, { bookID, userId }, { authenticate: ApiRoutes.ADD_BORROW_BOOK.auth });  
            if (res.status === 201) {  
                toast.success(res.data.message);  
                const dueDate = new Date();  
                dueDate.setDate(dueDate.getDate() + 14); // 14-day borrowing period   

                // Dispatch borrowBook action  
                dispatch(borrowBook({ bookID, userId, borrowDate: new Date().toISOString(), dueDate: dueDate.toISOString() }));  
                dispatch(updateAvailabilityStatus({ bookID, status: 'checked out' }));  
                setBorrowedBooks(prev => [  
                    ...prev,  
                    { bookID, userId, borrowDate: new Date().toISOString(), dueDate: dueDate.toISOString() }  
                ]); 
            }  
        } catch (error) {  
            console.error('Error borrowing book:', error);    
        }  
    };  

    const handleReserveBook = async (bookID) => {  
        try {  
            const res = await AxioService.post(`${ApiRoutes.RESERVE_BOOK.path}`, { bookID, userId }, { authenticate: ApiRoutes.RESERVE_BOOK.auth });  
            if (res.status === 200) {  
                toast.success(res.data.message);  
                dispatch(reserveBook({ bookID, userID: userId }));   
                dispatch(updateAvailabilityStatus({ bookID, status: 'reserved' }));   
                setReservedBooks(prev => [  
                    ...prev,  
                    { bookID, userId }
                ]); 
            }  
        } catch (error) {  
            console.error('Error reserving book:', error);    
            toast.error(`Error reserving book: ${error.response?.data.message || error.message}`);  
        }  
    };  

    useEffect(()=>{
        fetchBorrowedBooks()
    },[])
   

    
    return (  
        
        <div className="w-full lg:w-3/5 p-4">  
            <h2 className="text-2xl font-bold mb-4">Book Borrowing</h2>  
            <ul>  
            {books.map((book) => (  
                    <li key={book.bookID} className="flex justify-between items-center border-b py-2">  
                        <span>{book.title}</span>  
                        {book.availabilityStatus === 'available' ? (  
                            <button  
                                onClick={() => handleBorrowBook(book.bookID)}  
                                className="bg-green-500 text-white px-2 py-1 rounded"  
                            >  
                                Borrow  
                            </button>  
                        ) : book.availabilityStatus === 'checked out' ? (  
                            
                            borrowedBooks.some(b => b.bookID === book.bookID && b.userId === userId) ? ( // Check if the book is borrowed by the current user  
                                <span className="text-red-500">Checked Out</span>  
                            ) : (  
                                reservedBooks.some(r => r.bookID === book.bookID) ? ( // Check if the book is reserved  
                                    <span className="text-[#F5140A] font-extrabold">Reserved</span>  
                                ) : (  
                                    <button  
                                        onClick={() => handleReserveBook(book.bookID)}  
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"  
                                    >  
                                        Reserve  
                                    </button>  
                                )  
                            )  
                        ) : (  
                            <span className="text-[#F5140A] font-extrabold">Reserved</span>  
                        )}  
                    </li>  
                ))}  
            </ul>  
        </div>   
    );  
};  

export default BookBorrowing;