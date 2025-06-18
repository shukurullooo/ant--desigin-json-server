import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '400px',
  color: '#fff',
  lineHeight: '100%', 
  textAlign: 'center',
  background: '#364d79',
};
const App = () => {
  const onChange = currentSlide => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      <div width="100%">
        <img style={contentStyle} src="https://www.coca-cola.com/content/dam/onexp/uz/ru/homepage-images/homepage-mobile/mobile_1440x810_rus.jpg/width1960.jpg" alt="" />
      </div>
      <div>
        <img style={contentStyle} src="https://www.coca-cola.com/content/dam/onexp/uz/ru/home-images/homepage/uzb-ru-fanta-desktop.jpg/width1960.jpg" alt="" />
      </div>
      <div>
        <img style={contentStyle} src="https://www.coca-cola.com/content/dam/onexp/kz/ru/home-images/homepage/Banner2-d-1280x604-2.jpg/width1960.jpg" alt="" />
      </div>
    </Carousel>
  );
};
export default App;