import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { youtube } from '../api/youtube';
import VideoList from '../components/VideoList';

export default function Search() {
    const [params] = useSearchParams();
    const [videos, setVideos] = useState([]);

    const query = params.get('q');

    useEffect(() => {
        if (!query) return;

        youtube
            .get('/search', { params: { q: query, type: 'video' } })
            .then((res) => setVideos(res.data.items));
    }, [query]);

    return <VideoList videos={videos} />;
}
