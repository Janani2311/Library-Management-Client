import React,{useState} from 'react'
import PaginationTable from './PaginationTable'
import UpdationForm from './UpdationForm'
import { useSelector } from 'react-redux';

function UpdateBookInfo() {

    const books = useSelector((state) => state.books);
    const [selectedBookID, setSelectedBookID] = useState(null); 

    const handleEditButtonClick = (bookID) => {  
      setSelectedBookID(bookID);  
  }; 
  return (
    <div className='flex flex-col  lg:flex-row flex-nowrap w-full'>
        
    
            
                <div className='w-full lg:w-3/5 p-4'>
                    <div className="heading p-4 overflow-hidden mt-4 mb-2">
                        <h2 className='font-sans text-2xl font-extrabold text-[#4e73df]'>Book INFO</h2>
                    </div>
                    <PaginationTable data={books} rowsPerPage={5} onEditClick={handleEditButtonClick} />
                
                </div>

                <div className='w-full lg:w-2/5 p-4'>
                    <UpdationForm bookID = {selectedBookID}/>
                </div>
            
    </div>
  )
}

export default UpdateBookInfo