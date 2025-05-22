import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/anime/${anime.mal_id}`);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return 'No description available';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div 
            onClick={handleCardClick}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
        >
            <div className="relative overflow-hidden">
                <img 
                    src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url} 
                    alt={anime.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-lg font-bold text-sm">
                    {anime.score || 'N/A'}
                </div>
                {anime.status && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-lg font-medium text-xs">
                        {anime.status}
                    </div>
                )}
            </div>
            
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {anime.title}
                </h3>
                
                <div className="flex items-center mb-3 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg mr-2">
                        {anime.type || 'Unknown'}
                    </span>
                    {anime.episodes && (
                        <span className="bg-gray-100 px-2 py-1 rounded-lg">
                            {anime.episodes} episodes
                        </span>
                    )}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {truncateText(anime.synopsis, 120)}
                </p>
                
                {anime.genres && anime.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {anime.genres.slice(0, 3).map((genre) => (
                            <span 
                                key={genre.mal_id} 
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                                {genre.name}
                            </span>
                        ))}
                        {anime.genres.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                +{anime.genres.length - 3} more
                            </span>
                        )}
                    </div>
                )}
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default AnimeCard;