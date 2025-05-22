import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800/60 text-white mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-blue-400">AnimeFinder</h3>
                        <p className="text-gray-300">
                            Discover and explore your favorite anime series and movies. 
                            Powered by Jikan API.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Top Anime</a></li>
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Browse</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-4">About</h4>
                        <p className="text-gray-300 text-sm">
                            Built with React and Tailwind CSS. 
                            Data provided by MyAnimeList through Jikan API.
                        </p>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 AnimeFinder. Made by Youssef MT.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;