// features/bookSlice.js  
import { createSlice } from '@reduxjs/toolkit';  

const bookSlice = createSlice({  
    name: 'books',  
    initialState: [],  
    reducers: {  
        setBooks:(state, action) => {
            return action.payload;
        },
        addReview:(state, action) => {
            const { bookID, review } = action.payload;  
            const book = state.find(book => book.bookID === bookID);  
            if (book) {  
                book.reviews.push(review);  
            }  
        },
        addBook: (state, action) => {  
            state.push(action.payload);  
        },  
        updateBook: (state, action) => {  
            const index = state.findIndex(book => book.bookID === action.payload.id);  
            if (index !== -1) {  
                state[index] = action.payload;  
            }  
        },  
        deleteBook: (state, action) => {  
            return state.filter(book => book.bookID !== action.payload);  
        }, 
        updateAvailabilityStatus: (state, action) => {  
            const { bookID, status } = action.payload;  
            const book = state.find(book => book.bookID === bookID);  
            if (book) {  
                book.availabilityStatus = status; // Update the availability status  
            }  
        },   
    },  
});  

export const { setBooks,addReview, addBook, updateBook, deleteBook, updateAvailabilityStatus } = bookSlice.actions;  
export default bookSlice.reducer;