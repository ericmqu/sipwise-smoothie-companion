
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass py-4 px-6 flex items-center justify-between">
      <Link 
        to="/" 
        className="flex items-center space-x-2 text-xl font-semibold button-hover"
      >
        <span className="text-2xl">🥤</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-pulse-subtle">
          SipSafe
        </span>
      </Link>
      
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
