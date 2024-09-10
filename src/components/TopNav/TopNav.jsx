import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function TopNav() {
  let textTemplate = `Welcome to our Library Management System, a comprehensive solution designed to streamline and enhance the management of library resources. Our system is built using the MERN stack (MongoDB, Express.js, React, and Node.js), ensuring a robust, scalable, and user-friendly platform.
Our Mission
Our mission is to empower libraries with cutting-edge technology that simplifies the management of books, journals, media, and other resources. We aim to provide an efficient, intuitive, and accessible system that meets the needs of both librarians and patrons.
Key Features
•	Cataloguing: Easily organize and manage bibliographic records for all library materials.
•	Circulation: Streamline the process of checking materials in and out, managing holds, and handling renewals.
Why Choose Us?
•	Efficiency: Our system automates routine tasks, reducing the workload for librarians and improving overall efficiency.
•	Accessibility: With our online portal, users can access library resources anytime, anywhere.
Our Vision
We envision a future where libraries are seamlessly integrated with technology, providing unparalleled access to knowledge and resources. Our Library Management System is a step towards that future, offering a modern solution to traditional library challenges.
`

  let links = [
    {
        label:'Home',
        path: '/home',
        role: ["Admin", "User"]
    },
    {
        label:'Dashboard',
        path:'/dashboard',
        role:['Admin']
    },
    {
        label:'MyURLs',
        path:'/myurls',
        role:['User']
    }
  ]

  const [isPopupOpen, setIsPopupOpen] = useState(false);  

    const handleAboutClick = () => {  
        setIsPopupOpen(true);  
    };  

    const handleClosePopup = () => {  
        setIsPopupOpen(false);  
    };  

  return <>


            <nav className="bg-blue-700">  
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">  
                    <div className="flex items-center space-x-5 rtl:space-x-reverse">  
                        <a href="/" className="flex items-center">  
                            <img src="/images/logo.jpeg" className="h-10" alt="Flowbite Logo" />  
                            <span className="mx-1.5 self-center text-2xl font-semibold whitespace-nowrap text-white">LIBRO</span>  
                        </a>  
                        <a onClick={handleAboutClick} className="text-lg text-white hover:underline">About Us</a>  
                    </div>  
                    <div className="flex space-x-4">  
                    <Link to='/activelogin' className="text-lg text-white hover:underline">Activate account</Link>  
                        <Link to='/signup' className="text-lg text-white hover:underline">Sign Up</Link>  
                        <Link to='/login' className="text-lg text-white hover:underline">Log In</Link>  
                    </div>  
                </div>  
            </nav>

            {isPopupOpen && (  
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">  
                    <div className="bg-black p-6 rounded-lg max-w-md text-center relative">  
                        <button onClick={handleClosePopup} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">  
                            <i class="fa-sharp fa-solid fa-circle-xmark fa-2x"></i>
                        </button>  
                        <h2 className="text-2xl font-bold text-white p-2">Library System Management</h2>  
                            <div className='text-white mt-2'>
                            <p class="mb-6">A comprehensive solution designed to streamline and enhance the management of library resources. Our system is built using the MERN stack (MongoDB, Express.js, React, and Node.js), ensuring a robust, scalable, and user-friendly platform.</p>  
                            
                            <h2 class="text-2xl font-semibold mb-2">Our Mission</h2>  
                            <p class="mb-4">Our mission is to empower libraries with cutting-edge technology that simplifies the management of books, journals, media, and other resources. We aim to provide an efficient, intuitive, and accessible system that meets the needs of both librarians and patrons.</p>  
                            
                            <h2 class="text-2xl font-semibold mb-2">Key Features</h2>  
                            <ul class="list-disc list-inside mb-4">  
                                <li><strong>Cataloguing:</strong> Easily organize and manage bibliographic records for all library materials.</li>  
                                <li><strong>Circulation:</strong> Streamline the process of checking materials in and out, managing holds, and handling renewals.</li>  
                            </ul>  
                            </div>
                        </div>  
                    </div>  
              
            )}  
  </>
}

export default TopNav