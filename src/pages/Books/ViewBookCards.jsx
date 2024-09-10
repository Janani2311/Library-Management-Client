
import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import './viewBookCard.css';


function Card({book}) {


 let [flip,setFlip] = useState(false);
 let dummy = "/books/dummy.jpeg";


  return <>

            <div className="col-xl-3 col-md-6 mb-4 h-70">  
                <div className="card flip-card-inner shadow h-70 py-2 w-[14rem] sm:w-[14rem] md:w-[16rem] lg:w-[18rem]">  
                    <div className="card-body flex flex-col">  
                        <div className="row no-gutters align-items-center flex-grow">  
                            <div className="col">  
                                <ReactCardFlip isFlipped={flip} flipDirection='horizontal'>  
                                    <div className="flip-card-front max-w-md bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">  
                                        <img className="w-full h-48 object-cover" src={book.image ? book.image : dummy} alt="Book Cover" />  
                                        <div className="flex-grow">  
                                            <h4 className='text-xl font-bold mb-1 text-center text-[#7a0de0]'>{book.title}</h4>  
                                            <p className='text-gray-600 text-sm text-center mb-1'>{book.author}</p>  
                                            <p className='text-gray-700 text-sm mb-2'>{book.description}</p>  
                                        </div>  
                                        <div className='px-4 bg-gray-100'>  
                                            <button  
                                                className="w-full my-2 bg-[rgb(62,102,182)] text-coral font-semibold py-1 rounded hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-300"  
                                                onClick={() => setFlip(!flip)}  
                                            >  
                                                Details  
                                            </button>  
                                        </div>  
                                    </div>  

                                    <div className="flip-card-back max-w-md bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">  
                                        <img className="w-full h-40 object-cover" src={book.image ? book.image : dummy} alt="Book Cover" />  
                                        <div className='py-2 flex-grow'>  
                                            <p className='text-gray-600 text-sm mb-'>Published Date: &nbsp;{book.publishedDate}</p>  
                                            <p className='text-gray-600 text-sm mb-1'>Publisher: {book.publisher}</p>  
                                            <p className='text-gray-600 text-sm mb-1'>Language: {book.language}</p>  
                                            <p className='text-gray-600 text-sm mb-1'>ISBN: {book.isbn}</p>  
                                            <p className='text-gray-600 text-sm mb-1'>Page Count: {book.pageCount}</p>  
                                            <p className='text-gray-600 text-sm mb-1'>Books Available: {book.numBooksAvailable}</p>  
                                        </div>  
                                        <p>  
                                            <button  
                                                className="w-full my-2 bg-[rgb(62,102,182)] text-coral font-semibold py-1 rounded hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-300"  
                                                onClick={() => setFlip(!flip)}  
                                            >  
                                                Book Info  
                                            </button>  
                                        </p>  
                                    </div>  
                                </ReactCardFlip>  
                            </div>  
                        </div>  
                    </div>  
                </div>  
            </div>
       
  </>
}

export default Card
