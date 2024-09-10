import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import Gallery from './Gallery';

const CarouselComponent = () => {  
    const images = [  
        {  
            src: "/images/india.jpg",  
            alt: "Slide 1",  
            isActive: true  
        },  
        {  
            src: "/images/france.webp",  
            alt: "Slide 2",  
            isActive: false  
        },  
        {  
            src: "/images/newyork.jpeg",  
            alt: "Slide 4",  
            isActive: false  
        },  
        {  
            src: "/images/congress.jpg",  
            alt: "Slide 3",  
            isActive: false  
        },
        {  
          src: "/images/alexandria.jpg",  
          alt: "Slide 5",  
          isActive: false  
      }    
    ];  

    return (  
        <div className="container p-0">  
            <div className="row">  
                <div className="col-md-8 offset-md-2">  
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">  
                        <div className="carousel-inner">  
                            {images.map((image, index) => (  
                                <div className={`carousel-item ${image.isActive ? 'active' : ''}`} key={index}>  
                                    <img src={image.src} className="d-block w-100" alt={image.alt} />  
                                </div>  
                            ))}  
                        </div>  
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">  
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>  
                            <span className="visually-hidden">Previous</span>  
                        </button>  
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">  
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>  
                            <span className="visually-hidden">Next</span>  
                        </button>  
                    </div>  
                </div>  
            </div>  
        </div>  
        
    );  
}  

export default CarouselComponent;