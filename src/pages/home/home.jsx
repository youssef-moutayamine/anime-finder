import React, { useState, useEffect } from 'react';
import AnimeCard from '../../components/AnimeCard';
import ErrorMessage from '../../components/ErrorMessage';

const HomePage = () => {
    const [animes, setAnimes] = useState([]);
    const [filteredAnimes, setFilteredAnimes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('tv');

    const fetchAnimes = async (page = 1, type = 'tv') => {
        try {
            setError(null);
            
            const response = await fetch(
                `https://api.jikan.moe/v4/top/anime?type=${type}&page=${page}&limit=20`
            );
            
            if (!response.ok) {
                throw new Error('be patient, anime is loading...');
            }
            
            const data = await response.json();
            setAnimes(data.data || []);
            setFilteredAnimes(data.data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchAnimes(currentPage, filter);
    }, [currentPage, filter]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredAnimes(animes);
        } else {
            const filtered = animes.filter(anime => 
                anime.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredAnimes(filtered);
        }
    }, [searchQuery, animes]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleRetry = () => {
        fetchAnimes(currentPage, filter);
    };

    const filterOptions = [
        { value: 'tv', label: 'TV Series' },
        { value: 'movie', label: 'Movies' },
        { value: 'ova', label: 'OVA' },
        { value: 'special', label: 'Specials' },
        { value: 'ona', label: 'ONA' }
    ];

    return (
        <div >
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 mb-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to AnimeFinder
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Discover the best anime series and movies from around the world
                    </p>
                 
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="font-semibold">📺 Latest Episodes</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="font-semibold">⭐ Top Rated</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="font-semibold">🎬 Popular Movies</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="mb-8">
            <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8">
                        <div className="flex items-center gap-1">
                            <input
                                type="text"
                                placeholder="Search anime by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-l-lg border-0  focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-lg"
                            />
                            <button 
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium rounded-2xl transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Top Anime</h2>
                    <div className="flex flex-wrap gap-2">
                        {filterOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleFilterChange(option.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    filter === option.value
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}
            
            {!error && filteredAnimes.length === 0 && (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold  mb-2">No anime found</h3>
                    <p className="text-gray-500">Try changing your search .</p>
                </div>
            )}

            {!error && filteredAnimes.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                        {filteredAnimes.map((anime) => (
                            <AnimeCard key={anime.mal_id} anime={anime} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="flex items-center px-4 py-2 bg-gray-100 rounded-lg font-medium">
                            Page {currentPage}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;