import { useState, useEffect } from 'react';
import { youtube } from '../api/youtube';
import VideoList from '../components/VideoList';

const categories = [
    'українські мелодрами',
    'українські мелодрами 2023',
    'українські мелодрами 2024',
    'українські мелодрами 2025',
    'українські мелодрами 2026',
    'мелодрами',
    'мелодрами 2023',
    'мелодрами 2024',
    'мелодрами 2025',
    'мелодрами 2026',
    'українські комедії',
    'українські комедії 2023',
    'українські комедії 2024',
    'українські комедії 2025',
    'українські комедії 2026',
    'комедії',
    'комедії 2023',
    'комедії 2024',
    'комедії 2025',
    'комедії 2026',
];

export default function Home() {
    const [query, setQuery] = useState('мелодрами');
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);

    // debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query) searchVideos(query);
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    const searchVideos = async (searchQuery, isNextPage = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await youtube.get('/search', {
                params: {
                    q: searchQuery,
                    type: 'video',
                    maxResults: 50,
                    pageToken: isNextPage ? nextPageToken : '',
                },
            });

            const newVideos = res.data.items;

            setVideos((prev) =>
                isNextPage ? [...prev, ...newVideos] : newVideos,
            );

            setNextPageToken(res.data.nextPageToken || null);
        } catch (err) {
            console.error('Помилка:', err);
        } finally {
            setLoading(false);
        }
    };

    // автозагрузка
    useEffect(() => {
        searchVideos('мелодрами');
    }, []);

    const handleCategoryClick = (cat) => {
        setQuery(cat);
        setNextPageToken(null);
        searchVideos(cat);
    };

    return (
        <div style={{ display: 'flex', background: '#000', color: '#fff' }}>
            {/* SIDEBAR */}
            <div
                style={{
                    width: '250px',
                    borderRight: '1px solid #333',
                    padding: '10px',
                }}
            >
                {categories.map((cat) => (
                    <div
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            marginBottom: '5px',
                            background: query === cat ? '#222' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        ▶ {cat}
                    </div>
                ))}
            </div>

            {/* MAIN */}
            <div style={{ flex: 1, padding: '20px' }}>
                {/* SKELETON */}
                {loading && videos.length === 0 && <p>Завантаження...</p>}

                {/* VIDEOS */}
                <VideoList videos={videos} />

                {/* LOAD MORE */}
                {nextPageToken && (
                    <button
                        onClick={() => searchVideos(query, true)}
                        disabled={loading}
                        style={{
                            margin: '20px auto',
                            display: 'block',
                            padding: '10px 20px',
                            background: '#ec0c0c',
                            color: '#fff',
                        }}
                    >
                        {loading ? 'Завантаження...' : 'Ще фільми'}
                    </button>
                )}
            </div>
        </div>
    );
}
