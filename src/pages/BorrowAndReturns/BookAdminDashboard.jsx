import React, { useEffect, useState } from 'react';
import OverdueNotification from "./OverdueNotification";
import { useSelector } from 'react-redux';  

const AdminDashboard = () => {  
    const books = useSelector((state => state.books));  
    const borrowedBooks = useSelector((state => state.library.borrowedBooks))
   
    const availableBooks = books.filter(book => book.availabilityStatus === 'available');  
    const checkedOutBooks = books.filter(book => book.availabilityStatus === 'checked out');  
    const reservedBooks = books.filter(book => book.availabilityStatus === 'reserved');  

    return <>
    <div className='flex flex-col  lg:flex-row flex-nowrap w-full'>
        <div className="p-6 w-full lg:w-2/5 p-4">  
            <h1 className="text-2xl font-bold mb-4 mt-4">Book Borrows and Returns</h1>  

            <h2 className="text-xl font-semibold mb-2">Available Books</h2>  
            <Table data={availableBooks} />  

            <h2 className="text-xl font-semibold mb-2 mt-6">Checked Out Books</h2>  
            <Table data={checkedOutBooks} />  

            <h2 className="text-xl font-semibold mb-2 mt-6">Reserved Books</h2>  
            <Table data={reservedBooks} />  
        </div>  

        <div className='w-full lg:w-2/5 p-4'>
        <OverdueNotification/>
        </div>
    </div>
        </>  
};  

const Table = ({ data }) => {  
    return (  
        <table className="min-w-full bg-white border border-gray-300">  
            <thead>  
                <tr>  
                    <th className="py-2 px-4 border-b">Book Title</th>   
                </tr>  
            </thead>  
            <tbody>  
                {data.length > 0 ? (  
                    data.map((book) => (  
                        <tr key={book.id} className="hover:bg-gray-100">  
                            <td className="py-2 px-4 border-b">{book.title}</td>   
                        </tr>  
                    ))  
                ) : (  
                    <tr>  
                        <td colSpan="2" className="py-2 px-4 text-center">No records found</td>  
                    </tr>  
                )}  
            </tbody>  
        </table>  


    );  

   
};  

export default AdminDashboard;