import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import InstructionCarousel from './InstructionCarousel';
import SportsBookList from './SportsBookList';

const PopupComponent = (type) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    setIsPopupOpen(true);
  };

    return (
      <div>
          
          <span className="text-blue-500 text-sm cursor-pointer" onClick={handleClick}>{type.type === "instructions" ? "How to Use" : "Sportsbooks"}</span>
          
          <div className={isPopupOpen ? "overlay" : ""}>
              <Popup
                  open={isPopupOpen}
                  onClose={() => setIsPopupOpen(false)}
              >
                {type.type === "instructions" ?
                <div>
                  <div className="lg:hidden w-80 h-[40rem]">
                      <InstructionCarousel size="small"></InstructionCarousel>
                  </div>
                  <div className="hidden lg:block max-w-screen-md h-full">
                      <InstructionCarousel size="big"></InstructionCarousel>
                  </div>
                </div> : 
                <div>
                  <SportsBookList></SportsBookList>
                </div>}
              </Popup>
          </div>
          
      </div>
    );
  
};

export default PopupComponent;