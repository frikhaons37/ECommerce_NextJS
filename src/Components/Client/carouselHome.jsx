'use client';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
function ControlledCarousel() {

const [index, setIndex] = useState(0);
const handleSelect = (selectedIndex) => {
setIndex(selectedIndex);
};
return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{ 
    height: '750px',
marginLeft:"150px",
    
 }}>
    <Carousel.Item>
    
    <img src="c2.jpg" alt="Image"  />

    
    </Carousel.Item>
    <Carousel.Item>
    
    <img src="c5.jpg" />
    
    </Carousel.Item>
    <Carousel.Item>
    
    <img src="c3.jpg" />
    
    </Carousel.Item>
    <Carousel.Item>
    
    <img src="c4.png" />
    
    </Carousel.Item>
    </Carousel>
    );
    }
    export default ControlledCarousel;