import React from 'react';  

const Gallery = () => {  
    const images = [  
        {  
            src: "/books/davanci.jpg",  
            alt: "Image 1",  
            link: "#"  
        },  
        {  
            src: "/books/kite.jpeg",  
            alt: "Image 2",  
            link: "#"  
        },  
        {  
            src: "/books/midnight.jpg",  
            alt: "Image 3",  
            link: "#"  
        },  
        {  
            src: "/books/sapiens.jpg",  
            alt: "Image 4",  
            link: "#"  
        },  
        {  
            src: "https://media.geeksforgeeks.org/wp-content/uploads/20240308154939/html-(1).jpg",  
            alt: "Image 5",  
            link: "#"  
        },  
        {  
            src: "/books/js.jpeg",  
            alt: "Image 6",  
            link: "#"  
        }  
    ];  

    return (  
        <div className="container mt-5">  
            <h2 className="text-center mb-2 font-serif text-2xl text-blueviolet font-extrabold tracking-wide">Book Gallery</h2>  
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">  
                {images.map((image, index) => (  
                    <div className="w-full h-64 overflow-hidden" key={index}>  
                         
                            <img src={image.src} className="img-fluid rounded w-full h-full object-cover" alt={image.alt} />  
                          
                    </div>  
                ))}  
            </div>  
        </div>  
    );  
}  

export default Gallery;