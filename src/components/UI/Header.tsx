import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <svg className="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-11c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/>
            </svg>
            <span className="font-semibold text-xl">NBA Box Score Visualizer</span>
          </Link>
          
          <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        
        <nav className="flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
          <Link to="/" className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:shadow-outline">
            Dashboard
          </Link>
          <div className="relative">
            <button className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:shadow-outline">
              Tools
            </button>
          </div>
          <div className="relative">
            <button className="px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:shadow-outline">
              Settings
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;