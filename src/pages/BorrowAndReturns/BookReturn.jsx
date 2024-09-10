import React, { useState, useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import AxioService from '../../utils/AxioService';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import toast from 'react-hot-toast';
import { returnBook as returnBookAction} from '../../components/Redux/Library/librarySlice';
import { updateAvailabilityStatus } from '../../components/Redux/Book/bookSlice';

const BookReturn = () => {  
    const dispatch = useDispatch();  
    const books = useSelector((state => state.books));
    const userId = sessionStorage.getItem('id');  
    const [borrowedBooks, setBorrowedBooks] = useState([]);  
    const [selectedBook, setSelectedBook] = useState(null); 

    const fetchBorrowedBooks = async () => {  
        try {  
            const res = await AxioService.get(ApiRoutes.GET_ALL_BORROWED_BOOKS.path, { authenticate: ApiRoutes.GET_ALL_BORROWED_BOOKS.auth });  
            if (res.status === 200) {  
                const userBorrowedBooks = res.data.data.filter(book => book.userId === userId);  
                setBorrowedBooks(userBorrowedBooks);   
            }  
        } catch (error) {  
            console.error('Error fetching borrowed books:', error);  
        }  
    };  

    const formatDate = (dateString) => {  
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };  
        const date = new Date(dateString);  
        return date.toLocaleDateString(undefined, options);  
    };  

    const handleReturnClick = (borrowedBook) => {  
        const book = books.find(book => book.bookID === borrowedBook.bookID);  
        if (book) {  
            setSelectedBook({  
                title: book.title,  
                description: book.description,  
                dueDate: borrowedBook.dueDate,  
                bookID: borrowedBook.bookID, 
                lateFee:borrowedBook.lateFee 
            });  
        }  
    };  

    const returnBook = async () => {   
        const finePaid = selectedBook.lateFee === 0; // Determine if the fine is paid  

         try {
            let res = await AxioService.post(ApiRoutes.RETURN_BOOK.path, { bookID: selectedBook.bookID, userId, finePaid },
                { authenticate: ApiRoutes.RETURN_BOOK.auth }
            );  
            if(res.status === 200){
                toast.success(res.data.message)
                dispatch(returnBookAction({   
                    bookID: selectedBook.bookID,  
                    returnDate: new Date().toISOString(),  
                    lateFee: selectedBook.lateFee,  
                    finePaid  
                }));    
                dispatch(updateAvailabilityStatus({ bookID: selectedBook.bookID, status: 'available' }));   
                fetchBorrowedBooks(); // 
                setSelectedBook(null);   
            }
        
            
         } catch (error) {
            toast.error(`Error returning borrowed book: ${error.response?.data.message || error.message}`);  
         }
        
    };  

    useEffect(() => {  
        fetchBorrowedBooks();  
    }, []);  

    return (  
        <div className="flex flex-col  lg:flex-row flex-nowrap w-full">  
            <div className="w-full lg:w-3/5 p-4">  
                <h2 className="text-2xl font-bold mb-4">Book Returns</h2> 
                {borrowedBooks && borrowedBooks.length > 0 ? (  
                    <ul>  
                        {borrowedBooks.map(borrowedBook => {  
                            const book = books.find(book => book.bookID === borrowedBook.bookID);  
                            return (  
                                <li key={borrowedBook.bookID} className="flex justify-between items-center border-b py-2">  
                                    <span>{book ? book.title : 'Unknown Title'}</span>  
                                    <button  
                                        onClick={() => handleReturnClick(borrowedBook)}  
                                        className="bg-red-500 text-white px-2 py-1 rounded"  
                                    >  
                                        Return  
                                    </button>  
                                </li>  
                            );  
                        })}  
                    </ul>  
                ) : (  
                    <div>No books borrowed yet.</div>  
                )}  
            </div>  
            {selectedBook && (  
                <div className="w-full lg:w-2/5 p-4">  
                    <h3 className="text-xl font-bold mb-2">Return Book Details</h3>  
                    <p className='mt-1'><strong>Title:</strong> {selectedBook.title}</p>  
                    <p className='mt-1'><strong>Description:</strong> {selectedBook.description}</p>  
                    <p className='mt-1'><strong>Due Date:</strong> {formatDate(selectedBook.dueDate)}</p>  
                    <p className='mt-1'><strong>Fine Amount:</strong> <span className='p-1'>&#8377;</span>{selectedBook.lateFee}</p>  
                    <button  
                        onClick={returnBook}  
                        className="bg-green-500 text-white px-4 py-2 rounded mt-4"  
                    >  
                        Confirm Return  
                    </button>  
                </div>  
            )}  
        </div>  
    );  
};  

export default BookReturn;