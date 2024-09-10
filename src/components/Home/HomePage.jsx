import React from 'react';  
import CarouselComponent from './Home';
import Gallery from './Gallery';

const HomePage = () => {  
    return (  
        <div className="flex flex-col space-y-4 md:space-y-8 bg-[#b4b3dd]">  
            <CarouselComponent />  
            <Gallery />  
        </div>  
    );  
}  

export default HomePage;