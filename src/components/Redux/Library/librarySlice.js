// features/librarySlice.js  
import { createSlice } from '@reduxjs/toolkit';  

const librarySlice = createSlice({  
    name: 'library',  
    initialState: {  
        borrowedBooks: [],  
        reservedBooks: [],  
        overdueBooks: [],  
        notifications: []
    },  
    reducers: {  
        setBorrowedBooks:(state, action) => {
            state.borrowedBooks = action.payload;
        },
        borrowBook: (state, action) => {  
            const { bookID, userId, borrowDate, dueDate} = action.payload;  
            const borrowedBook = { bookID, userId, borrowDate: new Date().toISOString(), dueDate };  
            state.borrowedBooks.push(borrowedBook); 
        },  
        returnBook: (state, action) => {  
            const { bookID, returnDate, lateFee, finePaid } = action.payload;  
            const index = state.borrowedBooks.findIndex(book => book.bookID === bookID);  
            if (index !== -1) {    
                state.borrowedBooks.splice(index, 1); // Remove the book from borrowed list  
                state.finePaid = finePaid;  

            }  
        },    
        reserveBook: (state, action) => {  
            const { bookID, userID } = action.payload;  
            const reservedBook = { bookID, userID };  
            state.reservedBooks.push(reservedBook);  
        },  
        notifyOverdue: (state, action) => {  
            const { bookID, userID } = action.payload;  
            const notification = { bookID, userID, message: `Book ${bookID} is overdue!` };  
            state.notifications.push(notification);  
            state.overdueBooks.push(bookID); // Track overdue books  
        },  
        clearNotifications: (state) => {  
            state.notifications = []; // Clear all notifications  
        },  
    },  
});  

export const { borrowBook, returnBook, reserveBook, notifyOverdue, clearNotifications, setBorrowedBooks } = librarySlice.actions;  
export default librarySlice.reducer;