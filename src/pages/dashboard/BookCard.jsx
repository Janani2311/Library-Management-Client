import React, { useState, useEffect } from 'react';  
import { useDispatch } from 'react-redux';  
import toast from 'react-hot-toast';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import AxiosService from '../../utils/AxioService'; 
import { fetchReview,addReview } from '../../components/Redux/Book/reviewSlice'; 
import { useSelector } from 'react-redux';

const BookCard = ({ book, userId }) => {  
    //const reviews = useSelector((state) => state.reviews);
    const reviews = useSelector((state) => state.reviews[book.bookID] || []);
    

    const dispatch = useDispatch();  
    const [reviewInput, setReviewInput] = useState('');  
    const [rating, setRating] = useState(0);   
    const [averageRating, setAverageRating] = useState(0);


    const calculateAverageRating = (reviewList) => {  
        const totalRating = reviewList.reduce((acc, review) => acc + review.rating, 0);  
        return reviewList.length > 0 ? (totalRating / reviewList.length).toFixed(1) : 0;  
    };

    // Function to fetch reviews based on review IDs  

    // const fetchReviews = async (reviewIds) => {  
    //     try {  
    //         // Fetch all reviews using review IDs  
    //         const reviewPromises = reviewIds.map(id =>   
    //             AxiosService.get(`${ApiRoutes.GET_REVIEWS_BY_ID.path}/${id}`, {   
    //                 authenticate: ApiRoutes.GET_REVIEWS_BY_ID.auth   
    //             })  
    //         );  
    
             
    //         const reviewResponses = await Promise.allSettled(reviewPromises);  
          
            
    //         const reviewData = [];  
    //         reviewResponses.forEach(response => {  
    //             if (response.status === 'rejected') {  
    //                 console.error("Error fetching review:", response.reason);   
    //             } else {  
    //                 const review = response.value.data;  
    //                 reviewData.push(review);  
    //             }  
    //         });  
    
    //         if (reviewData.length > 0) {  
    //             dispatch(fetchReview({ bookID: book.bookID, reviews: reviewData }));  
    //             const avgRating = calculateAverageRating(reviewData);   
    //             setAverageRating(avgRating); // Set average rating  
    //         } else {  
    //             console.warn("No valid reviews found.");  
    //         }  
    
    //     } catch (error) {  
    //         console.error("An unexpected error occurred while fetching reviews:", error);  
    //     }  
    // };
   
    const fetchReviews = async (reviewIds) => {  
        try {  
            if (!Array.isArray(reviewIds) || reviewIds.length === 0) {  
                console.warn("No valid review IDs to fetch.");  
                return;  
            }  
    
            // Fetch all reviews using review IDs  
            const reviewPromises = reviewIds.map(id =>   
                AxiosService.get(`${ApiRoutes.GET_REVIEWS_BY_ID.path}/${id}`, {   
                    authenticate: ApiRoutes.GET_REVIEWS_BY_ID.auth   
                })
            );  
    
            const reviewResponses = await Promise.allSettled(reviewPromises);  
    
            const reviewData = reviewResponses.flatMap(response => {  
                if (response.status === 'fulfilled') {  
                    return response.value ? [response.value.data] : []; // Avoid adding nulls  
                } else {  
                    //console.error("Error fetching review:", response.reason);  
                    return []; // Return an empty array if rejected  
                }  
            });  
    
            if (reviewData.length > 0) {  
                dispatch(fetchReview({ bookID: book.bookID, reviews: reviewData }));  
                const avgRating = calculateAverageRating(reviewData);  
                setAverageRating(avgRating); // Set average rating  
            }   
    
        } catch (error) {  
            console.error("An unexpected error occurred while fetching reviews:", error);  
        }  
    };
    // Fetch reviews whenever the book data changes  
    useEffect(() => {  
        if (book.reviews && book.reviews.length > 0) {  
            fetchReviews(book.reviews); // Fetch reviews based on the review IDs in book data  
        }  
    }, [book.reviews]);  


    const handleAddReview = async (review) => {  
        if (review.text.trim() && review.rating) {   
            try {  
                const res = await AxiosService.post(`${ApiRoutes.ADD_REVIEW.path}`, {  
                    bookID: book.bookID,  
                    userId,  
                    reviewText: review.text,  
                    rating: review.rating  
                }, { authenticate: ApiRoutes.ADD_REVIEW.auth });  
                
    
                if (res.status === 201) {  
                    toast.success(res.data.message);  
                    setReviewInput('');  
                    setRating(0);   
                    dispatch(addReview({   
                        bookID: book.bookID,   
                        review: review.text,   
                        rating: review.rating,
                        reviewID:res.data.review._id  
                    }));  
                } else {  
                    toast.error("Failed to add review.");  
                }  
    
            } catch (error) {    
                const message = error.response ? error.response.data.message : "An error occurred";  
                toast.error(message);  
            }  
        } else {  
            toast.error('Review cannot be empty and a rating must be selected!');  
        }  
    };  

    return (  
        <div className="flex flex-col justify-between h-full border rounded-lg p-4 shadow-md bg-[#b3c6e8] mb-4">  
            <div>  
                <p className="text-xl font-semibold">{book.title}</p>  
                <p className="text-gray-700">{book.description}</p>  

                <div className="mt-3">  
                     
                            <p className="font-bold">Average Rating: {averageRating ? <div className="flex items-center mt-2">  
                                {[1, 2, 3, 4, 5].map((star) => (  
                                    <span  
                                        key={star}  
                                        className={`cursor-pointer ${star <= averageRating ? 'text-yellow-500' : 'text-gray-400'}`}    
                                    >  
                                        ★  
                                    </span>  
                                ))}  
                            </div> : 'No rating yet'}</p>  
                     
                </div>  

                 
                <div className="mt-3">  
                    <p className="font-bold">Reviews:</p>  
                    {reviews.length > 0 ? (  
                        reviews.map((review, index) => (  
                            <p key={index} className="text-gray-600">- {review.reviewText}</p>  
                        ))  
                    ) : (  
                        <p className="text-gray-500">No reviews yet.</p>  
                    )}  
                </div>  
            </div>  

            <div className="border-t border-gray-300 my-1" /> {/* Divider */} 
            <div className="mt-1">  
                <div className="flex items-center">  
                    {[1, 2, 3, 4, 5].map((star) => (  
                        <span  
                            key={star}  
                            className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}  
                            onClick={() => setRating(star)}  
                        >  
                            ★  
                        </span>  
                    ))}  
                </div>  

                <input  
                    type="text"  
                    value={reviewInput}  
                    onChange={(e) => setReviewInput(e.target.value)} // Update state on input change  
                    placeholder="Write your review here..."  
                    className="border rounded px-2 py-1 w-full"  
                />  

                <button  
                    onClick={() => handleAddReview({ text: reviewInput, rating })}  
                    className="bg-blue-500 text-white px-2 py-1 rounded mt-2"  
                >  
                    Add Review  
                </button>  
            </div>  
        </div>  
    );  
};  

export default BookCard;