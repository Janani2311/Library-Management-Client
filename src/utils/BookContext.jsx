// import React, { createContext, useContext, useEffect, useState } from "react";  
// import AxiosService from "./AxioService";  
// import { toast } from "react-toastify";
// import ApiRoutes from "./Routes/ApiRoutes";
// import { useDispatch } from "react-redux";
// import { setBooks } from "../components/Redux/Book/bookSlice";

// const BookContext = createContext();  

// export const BookProvider = ({ children }) => {  
//     const [books, setBooksState] = useState([]);  
//     const dispatch = useDispatch();

//     const fetchdata = async () => {  
//         try {  
//             let res = await AxiosService.get(`${ApiRoutes.GET_ALL_BOOKS.path}`, { authenticate: ApiRoutes.GET_ALL_BOOKS.auth });  
//             if (res.status === 200) {   
//                 setBooksState(res.data.data);  
//                 dispatch(setBooks(res.data.data));
//             }  
//         } catch (error) {  
//             toast.error(error);  
//         }  
//     };  

    

//     useEffect(() => {  
//         fetchdata();  
//     }, []); // Fetch data only once when the provider mounts  

//     return (  
//         <BookContext.Provider value={{ books, setBooks}}>  
//             {children}  
//         </BookContext.Provider>  
//     );  
// };  

// // Custom hook to use the BookContext  
// export const useBooks = () => {  
//     return useContext(BookContext);  
// };