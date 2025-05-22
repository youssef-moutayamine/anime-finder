import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-lg border-b-2 border-blue-500">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link 
                        to="/" 
                        className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        AnimeFinder
                    </Link>
                    
                    <div className="flex items-center space-x-6">
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse Anime
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;