import { Link } from 'react-router-dom';
import React from 'react';
const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white font-bold text-xl">
            Customer Management
          </Link>
          <div>
            <Link
              to="/customers/new"
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50"
            >
              New Customer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;