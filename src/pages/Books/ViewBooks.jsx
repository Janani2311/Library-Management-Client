import React from 'react'
import Card from './ViewBookCards'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'

function ViewBooks() {

const books = useSelector((state) => state.books);

let [filteredBooks, setFilteredBooks] = useState(books);
let [searchValue,setSearchValue] = useState("");

useEffect(() => {  
  setFilteredBooks(books);  
}, [books]);  

const handleSearch = (value) => {  

      setSearchValue(value)

      if(value.trim() === ""){
        setFilteredBooks(books);
        return;
      }
  const results = books.filter(book =>   
      book.title.toLowerCase().includes(value.toLowerCase()) ||  
      book.author.toLowerCase().includes(value.toLowerCase()) ||  
      book.genre.toLowerCase().includes(value.toLowerCase()) || 
      book.isbn.includes(value)  
  );  

  setFilteredBooks(results)
} 

  return <>
  <div className='flex flex-col flex-nowrap justify-center items-center w-full'>
    <div className="heading w-full p-4 h-48 overflow-hidden mt-4 mb-2">
      <h2 className='font-sans text-2xl font-extrabold text-[#4e73df]'>All Books</h2>
    
      <div className="container-fluid search-container">
        <form className="flex flex-row flex-nowrap gap-4 mt-4" 
            role="search" 
            id="content-search"
            onSubmit={(e) => {  
              e.preventDefault(); 
          }}  
        >
          <input className="px-4 py-2 border border-gray-300 rounded-2-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            type="search" 
            placeholder="Title/Author/ISBN/Genre" 
            aria-label="Search" 
            id="search-value"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}/>
          <button className="btn btn-outline-success" 
            type="submit" 
            onClick={()=> handleSearch(searchValue)}
            >Search</button>
        </form>
      </div>
    </div>
    
   
      <div className="grid gap-4 align-items-start mr-0 ml-0 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
        {
          filteredBooks.map((book,i) => {
            return <Card book={book} key={i}/>
          })
        }
       
      </div>
  </div>
  
  </>
}

export default ViewBooks;