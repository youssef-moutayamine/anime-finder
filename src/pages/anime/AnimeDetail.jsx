import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

const AnimeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch anime details');
                }
                
                const data = await response.json();
                setAnime(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAnimeDetail();
        }
    }, [id]);

    const handleRetry = () => {
        const fetchAnimeDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch anime details');
                }
                
                const data = await response.json();
                setAnime(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimeDetail();
    };

    if (loading) {
        return null;
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (!anime) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Anime not found</h3>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')}
                className="mb-6 flex items-center  hover:text-white font-medium transition-colors"
            >
                Back to Home
            </button>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-2xl overflow-hidden mb-8">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 p-8">
                        <img 
                            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                            alt={anime.title}
                            className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
                        />
                    </div>
                    
                    <div className="lg:w-2/3 p-8">
                        <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
                        {anime.title_english && anime.title_english !== anime.title && (
                            <h2 className="text-xl opacity-80 mb-4">{anime.title_english}</h2>
                        )}
                        
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="bg-yellow-500 px-3 py-1 rounded-lg font-bold">
                                 {anime.score || 'N/A'}
                            </div>
                            <div className="bg-white/20 px-3 py-1 rounded-lg font-medium">
                                {anime.type}
                            </div>
                            <div className="bg-white/20 px-3 py-1 rounded-lg font-medium">
                                {anime.status}
                            </div>
                            {anime.episodes && (
                                <div className="bg-white/20 px-3 py-1 rounded-lg font-medium">
                                    {anime.episodes} Episodes
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
                            <div>
                                <span className="opacity-70">Year:</span>
                                <div className="font-semibold">{anime.year || 'Unknown'}</div>
                            </div>
                            <div>
                                <span className="opacity-70">Season:</span>
                                <div className="font-semibold capitalize">{anime.season || 'Unknown'}</div>
                            </div>
                            <div>
                                <span className="opacity-70">Source:</span>
                                <div className="font-semibold">{anime.source || 'Unknown'}</div>
                            </div>
                            <div>
                                <span className="opacity-70">Duration:</span>
                                <div className="font-semibold">{anime.duration || 'Unknown'}</div>
                            </div>
                        </div>

                        {anime.genres && anime.genres.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.genres.map((genre) => (
                                        <span 
                                            key={genre.mal_id}
                                            className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Synopsis */}
                    <section className="bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Synopsis</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {anime.synopsis || 'No synopsis available.'}
                        </p>
                    </section>

                    {/* Trailer */}
                    {anime.trailer?.youtube_id && (
                        <section className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Trailer</h3>
                            <div className="aspect-video rounded-lg overflow-hidden">
                                <iframe
                                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                                    title="Anime Trailer"
                                    className="w-full h-full"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </section>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Info Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Information</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-sm text-gray-500">Studios:</span>
                                <div className="font-medium">
                                    {anime.studios?.map(studio => studio.name).join(', ') || 'Unknown'}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Producers:</span>
                                <div className="font-medium text-sm">
                                    {anime.producers?.slice(0, 3).map(producer => producer.name).join(', ') || 'Unknown'}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Aired:</span>
                                <div className="font-medium">
                                    {anime.aired?.string || 'Unknown'}
                                </div>
                            </div>
                            {anime.rating && (
                                <div>
                                    <span className="text-sm text-gray-500">Rating:</span>
                                    <div className="font-medium">{anime.rating}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* External Links */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">External Links</h3>
                        <div className="space-y-2">
                            
                            {anime.trailer?.url && (
                                <button onClick={() => window.open(anime.trailer.url, '_blank')}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full bg-red-600 text-white text-center py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    Watch Trailer
                                </button>
                            )}
                        </div>
                    </div>

                  
                </div>
            </div>
        </div>
    );
};

export default AnimeDetail;