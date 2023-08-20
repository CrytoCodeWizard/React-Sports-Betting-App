import PopupComponent from "./PopupComponent";

const Footer = () => {
  
    return (
    <div>
      <div className="mx-auto max-w-screen-2xl flex items-center justify-center border-t border-blue-gray-50 py-4 gap-8">
        <div>
          <PopupComponent type="instructions" text="text-blue-500 text-sm cursor-pointer"></PopupComponent>
        </div>
        <div>
          <a href="mailto:team@shopthe-line.com">
          <span className="text-blue-500 text-sm">Contact Us</span></a>
        </div>
        <div>
          <PopupComponent type="sportsbook-list" text="text-blue-500 text-sm cursor-pointer"></PopupComponent>
        </div>
        
      </div>
      <div className="mx-auto max-w-screen-2xl flex items-center justify-center gap-8 mb-4">
          <div>
            <span className="text-sm">Icons by <a color="red" target="_blank" rel="noopener noreferrer" href="https://icons8.com">
            <span className="text-blue-500 text-sm">Icons8</span> </a></span>
            
          </div>
          <div>
            <span className="text-sm">Powered by <a color="red" target="_blank" rel="noopener noreferrer" href="https://the-odds-api.com/">
            <span className="text-blue-500 text-sm">The Odds API</span></a></span>
          </div>
      </div>
      <div className="mx-auto max-w-screen-2xl flex items-center justify-center gap-8 mb-8">
          <div>
            <PopupComponent type="terms" text="text-gray-500 text-sm cursor-pointer"></PopupComponent> 
          </div>
          <div>
            <span className="text-gray-500 text-sm">|</span>
          </div>
          <div>
            <PopupComponent type="privacy" text="text-gray-500 text-sm cursor-pointer"></PopupComponent>
          </div>
      </div>
    </div>);
  };
  
  export default Footer;