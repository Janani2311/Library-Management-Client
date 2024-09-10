// selectors.js  
// import { createSelector } from 'reselect';  

// export const selectReviewsByBookId = (state, bookID) => state.reviews.filter(review => review.bookID === bookID);  

// export const makeSelectReviewsByBookId = () => createSelector(  
//     [selectReviewsByBookId],  
//     (reviews) => reviews[0]?.reviews || []  
// );  

// features/selectors.js  
import { createSelector } from 'reselect';  

const selectReviewsState = (state) => state.reviews;  

export const selectReviewsByBookID = createSelector(  
  [selectReviewsState, (state, bookID) => bookID],  
  (reviewsList, bookID) => {  
    return reviewsList[bookID] || []; // Return cached reference when state doesn’t change  
  }  
);