import React, { useState, useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { selectReviewsByBookID } from '../../components/Redux/Book/Selector';
import { fetchReview,updateReview, deleteReview } from './../../components/Redux/Book/reviewSlice';  
import AxiosService from '../../utils/AxioService';
import ApiRoutes from '../../utils/Routes/ApiRoutes';
import toast from 'react-hot-toast'
// import { PencilIcon, TrashIcon } from 'lucide-react';  

const ReviewsTable = ({ book, rowsPerPage }) => {  
    
    const dispatch = useDispatch();  
    const reviews = useSelector((state) => state.reviews[book.bookID] || []); 
   
    
    const fetchReviews = async (reviewIds) => {  
        try {  
            // Fetch all reviews using review IDs  
            const reviewPromises = reviewIds.map(id =>   
                AxiosService.get(`${ApiRoutes.GET_REVIEWS_BY_ID.path}/${id}`, {   
                    authenticate: ApiRoutes.GET_REVIEWS_BY_ID.auth   
                })  
            );  
    
             
            const reviewResponses = await Promise.allSettled(reviewPromises);  
          
            
            const reviewData = [];  
            reviewResponses.forEach(response => {  
                if (response.status === 'rejected') {  
                   // console.error("Error fetching review:", response.reason);   
                } else {  
                    const review = response.value.data;  
                    reviewData.push(review);  
                }  
            });  
    
            if (reviewData.length > 0) {  
                dispatch(fetchReview({ bookID: book.bookID, reviews: reviewData }));  
            } else {  
                console.warn("No valid reviews found.");  
            }  
    
        } catch (error) {  
           // console.error("An unexpected error occurred while fetching reviews:", error);  
        }  
    };
    // const fetchReviews = async (reviewIds) => {  
    //     try {  
    //         // Fetch all reviews using review IDs  
    //         const reviewPromises = reviewIds.map(id => AxiosService.get(`${ApiRoutes.GET_REVIEWS_BY_ID.path}/${id}`), { authenticate: ApiRoutes.GET_REVIEWS_BY_ID.auth });  
    //         const reviewResponses = await Promise.all(reviewPromises);  
    //         const reviewData = reviewResponses.map(res => res.data);   
            
    //         dispatch(fetchReview({ bookID: book.bookID, reviews: reviewData })); 
  
    //     } catch (error) {  
    //         console.error("Failed to fetch reviews:", error);  
    //     }  
    // };  

    useEffect(() => {  
        if (book.reviews && book.reviews.length > 0) {  
            fetchReviews(book.reviews); // Fetch reviews based on the review IDs in book data  
        }  
    }, [book]);  

    const [currentPage, setCurrentPage] = useState(1);  
    const [editingReview, setEditingReview] = useState(null); // To handle editing state  
    const [updatedText, setUpdatedText] = useState(''); // New text for the review  

    const handleUpdate = async(reviewID) => {  
        const updatedReview = { reviewText: updatedText};  
        try {
            let res = await AxiosService.patch(`${ApiRoutes.UPDATE_REVIEW.path}/${reviewID}`,{review:updatedText},{authenticate:ApiRoutes.UPDATE_REVIEW.auth})
            if(res.status === 200){
                toast.success(res.data.message)
                dispatch(updateReview({ bookID: book.bookID, reviewID, updatedReview }));  
                setEditingReview(null); // Reset editing state  
                setUpdatedText(''); // Clear updated text 
            }
        } catch (error) {
            toast.error(error.message);
        }
       
       
    };  

    const handleDelete = async(reviewID) => {  
        try {
            let res = await AxiosService.delete(`${ApiRoutes.DELETE_REVIEW.path}/${reviewID}`,{authenticate:ApiRoutes.DELETE_REVIEW.auth})
            if(res.status === 200){
                toast.success(res.data.message)
                dispatch(deleteReview({ bookID: book.bookID, reviewID }));  
                setEditingReview(null); // Reset editing state  
                setUpdatedText(''); // Clear updated text 
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    };  

    const totalPages = Math.ceil(reviews.length / rowsPerPage);  
    const indexOfLastReview = currentPage * rowsPerPage;  
    const indexOfFirstReview = indexOfLastReview - rowsPerPage;  
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);  

    return (
        <div className="border rounded-lg p-4 mb-4 shadow-md w-full max-w-md mx-auto">  
    <h3 className="text-lg font-bold mb-2">{book.title}</h3>  
    <ul>  
        {currentReviews.length > 0 ? (  
            currentReviews.map((review) => (  
                <li key={review._id} className="flex justify-between items-center border-b py-2">  
                    {editingReview?._id === review._id ? (  
                        <div className="flex flex-col space-x-2 w-full">  
                            <input  
                                type="text"  
                                value={updatedText}  
                                onChange={(e) => setUpdatedText(e.target.value)}  
                                className="border p-1 mb-1"  
                            />  
                            <button onClick={() => handleUpdate(review._id)} className="text-blue-500">Update</button>  
                        </div>  
                    ) : (  
                        <span className="flex-1">{review.reviewText}</span>  
                    )}  
                    <div className="flex space-x-2 ml-4">  
                        <button onClick={() => {   
                            setEditingReview(review);   
                            setUpdatedText(review.reviewText);   
                        }}>  
                            <i className="fas fa-edit"></i>  
                        </button>  
                        <button onClick={() => handleDelete(review._id)} className="text-red-500">  
                            <i className="fa-sharp fa-solid fa-trash"></i>  
                        </button>  
                    </div>  
                </li>  
            ))  
        ) : (  
            <li className="text-center py-2">No reviews available.</li>  
        )}  
    </ul>  
    <div className="flex justify-center mt-4">  
        {Array.from({ length: totalPages }, (_, index) => (  
            <button  
                key={index + 1}  
                onClick={() => setCurrentPage(index + 1)}  
                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}  
            >  
                {index + 1}  
            </button>  
        ))}  
    </div>  
</div>
        // <div className="border rounded-lg p-2 mb-2 shadow-md w-[80vw]">  
        //     <h3 className="text-lg font-bold mb-2">{book.title}</h3>  
        //     <ul>  
        //         {currentReviews.length > 0 ? (  
        //             currentReviews.map((review) => (  
        //                 <li key={review._id} className="flex justify-between border-b py-2">  
        //                     {editingReview?._id === review._id ? (  
        //                         <div className="flex flex-col space-x-2">  
        //                             <input  
        //                                 type="text"  
        //                                 value={updatedText}  
        //                                 onChange={(e) => setUpdatedText(e.target.value)}  
        //                                 className="border p-1 mb-1"  
        //                             />  
        //                             <button onClick={() => handleUpdate(review._id)} className="text-blue-500">Update</button>  
        //                         </div>  
        //                     ) : (  
        //                         <span>{review.reviewText}</span>  
        //                     )}  
        //                     <div>  
        //                         <button onClick={() => {   
        //                             setEditingReview(review);   
        //                             setUpdatedText(review.reviewText);  // Set the input field to current review text   
        //                         }}  
        //                         >  
        //                             <i class="fas fa-edit"></i>  
        //                         </button>  
        //                         <button onClick={() => handleDelete(review._id)}>  
        //                         <i className="fa-sharp fa-solid fa-trash"></i> 
        //                         </button>  
        //                     </div>  
        //                 </li>  
        //             ))  
        //         ) : (  
        //             <li className="text-center py-2">No reviews available.</li>  
        //         )}  
        //     </ul>  
        //     <div className="flex justify-center mt-4">  
        //         {Array.from({ length: totalPages }, (_, index) => (  
        //             <button  
        //                 key={index + 1}  
        //                 onClick={() => setCurrentPage(index + 1)}  
        //                 className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}  
        //             >  
        //                 {index + 1}  
        //             </button>  
        //         ))}  
        //     </div>  
        // </div>
          
    );  
};  

export default ReviewsTable;