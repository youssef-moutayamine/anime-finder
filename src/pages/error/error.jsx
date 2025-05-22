import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for seems to have disappeared into the anime dimension. 
                    Let's get you back to discovering amazing anime!
                </p>
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mr-4"
                    >
                        Back to Home
                    </button>
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;