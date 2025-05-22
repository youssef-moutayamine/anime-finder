import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 mb-6 text-center max-w-md">
                {message || 'Failed to load anime data. Please check your internet connection and try again.'}
            </p>
            {onRetry && (
                <button 
                    onClick={onRetry}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;