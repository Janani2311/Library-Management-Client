// store.js  
import {configureStore} from "@reduxjs/toolkit"
import bookReducer from './Book/bookSlice.js';
import reviewReducer from './Book/reviewSlice.js';  
import libraryReducer from './Library/librarySlice.js'

const store = configureStore({
    reducer:{
        books:bookReducer,
        reviews:reviewReducer,
        library:libraryReducer
    }
}); 

export default store;