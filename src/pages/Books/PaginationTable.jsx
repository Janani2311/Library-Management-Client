import React, { useState } from "react";  
import AxiosService from "../../utils/AxioService";
import ApiRoutes from "../../utils/Routes/ApiRoutes";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../components/Redux/Book/bookSlice";


const PaginationTable = ({ data, rowsPerPage , onEditClick}) => {  

   
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);  
    const totalPages = Math.ceil(data.length / rowsPerPage);  

    const handlePageChange = (page) => {  
        setCurrentPage(page);  
    };  

    const startIndex = (currentPage - 1) * rowsPerPage;  
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);  

    const handleDelete = async(bookID) => {
        
        try {
            let res = await AxiosService.delete(`${ApiRoutes.DELETE_BOOK_BY_ID.path}/${bookID}`,
                {authenticate:ApiRoutes.DELETE_BOOK_BY_ID.auth}
            )

            if(res.status === 200){
                console.log(res.data.book.bookID)
                dispatch(deleteBook(res.data.book.bookID))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (  
        <div className="p-4 w-70vw">  
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">  
                <thead>  
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">  
                        <th className="border border-gray-200 p-2">#</th>  
                        <th className="border border-gray-200 p-2">Title</th>  
                        <th className="border border-gray-200 p-2">Author</th> 
                        <th className="border border-gray-200 p-2">Actions</th> 
                    </tr>  
                </thead>  
                <tbody className="text-gray-600 text-sm font-semibold">  
                    {currentData.map((item,i) => (  
                        <tr key={i} className="border-b border-gray-300 hover:bg-gray-100 text-center">  
                            <td className="border border-gray-200 p-2">{startIndex+i+1}</td>  
                            <td className="border border-gray-200 p-2">{item.title}</td>  
                            <td className="border border-gray-200 p-2">{item.author}</td>
                            <td className="border border-gray-200 p-2">
                                <span className="cursor-pointer px-2" onClick={()=>onEditClick(item.bookID)}><i class="fas fa-edit"></i></span>
                                <span className="cursor-pointer px-2" onClick={()=>handleDelete(item.bookID)}>
                                    <i className="fa-sharp fa-solid fa-trash"></i></span></td>    
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
            <div className="flex justify-between mt-4">  
                <button  
                    onClick={() => handlePageChange(currentPage - 1)}  
                    disabled={currentPage === 1}  
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"  
                >  
                    Previous  
                </button>  
                <span>  
                    Page {currentPage} of {totalPages}  
                </span>  
                <button  
                    onClick={() => handlePageChange(currentPage + 1)}  
                    disabled={currentPage === totalPages}  
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"  
                >  
                    Next  
                </button>  
            </div>  
        </div>  
    );  
};  

export default PaginationTable;  