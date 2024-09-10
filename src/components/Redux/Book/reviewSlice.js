// features/reviewSlice.js  
import { createSlice } from '@reduxjs/toolkit';  

const reviewSlice = createSlice({  
    name: 'reviews',  
    initialState: {},  
    reducers: {  
        fetchReview: (state, action) => {    
            const { bookID, reviews } = action.payload;   
        
            if (Array.isArray(reviews)) {  
                if (state[bookID]) {  
                    const existingReviewIds = new Set(state[bookID].map(review => review._id));  
                    // Filter out duplicates before merging  
                    const uniqueReviews = reviews.filter(review => !existingReviewIds.has(review._id));  
        
                    state[bookID] = [...state[bookID], ...uniqueReviews];  
                } else {  
                    state[bookID] = [...reviews]; // Initialize new state if it doesn't exist  
                }  
            } else {  
                console.error("Expected reviews to be an array");  
            }  
        }, 
        addReview: (state, action) => {  
            const { bookID, review, rating, reviewID } = action.payload;  
            const newReview = { _id: reviewID ,reviewText: review, rating };  
            
            if (!state[bookID]) {  
                state[bookID] = []; 
            }  
            state[bookID].push(newReview); // Push the new review  
        },  
         
        updateReview: (state, action) => {  
            const { bookID, reviewID, updatedReview } = action.payload;  
        
            // Ensure that we have a valid bookID  
            if (state[bookID]) {  
                const reviewIndex = state[bookID].findIndex(review => review._id === reviewID);   
        
                if (reviewIndex !== -1) {  
                    // Update the specific review  
                    // Immer allows direct mutation to the array   
                    const existingReview = state[bookID][reviewIndex];  
                    Object.assign(existingReview, updatedReview);  
        
                    // Update average rating  
                    const totalReviews = state[bookID].length;  
                    const totalRating = state[bookID].reduce((sum, review) => sum + (review.rating || 0), 0);  
                    state[bookID].averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;  
                } else {  
                    console.error("Review not found for ID:", reviewID);  
                }  
            } else {  
                console.error("No reviews found for bookID:", bookID);  
            }  
        },
        deleteReview: (state, action) => {  
            const { bookID, reviewID } = action.payload;  
            if (state[bookID]) {  
                state[bookID] = state[bookID].filter(review => review._id !== reviewID); // Remove the review  
                if (state[bookID].length === 0) {  
                    delete state[bookID]; // Remove book entry if no reviews left  
                }  
            }  
        },  
    },  
});  

export const { addReview,fetchReview, updateReview, deleteReview } = reviewSlice.actions;  
export default reviewSlice.reducer;