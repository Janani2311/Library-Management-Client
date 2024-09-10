import React from 'react';  
import ReviewsTable from './ReviewTable'; // Ensure the path is correct.  
import { useSelector } from 'react-redux';  

function UpdateReviews() {  
    const books = useSelector((state) => state.books);  


    return (  
        <div className='w-full'>  
                <div className="heading p-4 overflow-hidden mt-4 mb-2">  
                    <h2 className='font-sans text-2xl font-extrabold text-[#4e73df]'>Review INFO</h2>  
                </div>  
                {books.map(book => (  
                    <ReviewsTable  
                        key={book.bookID}  
                        book={book}  
                        rowsPerPage={2}  
                    />  
                ))}  
        </div>  
         
    );  
}  

export default UpdateReviews;