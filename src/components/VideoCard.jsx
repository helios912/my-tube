import { Link } from 'react-router-dom';
import '../App.css';

export default function VideoCard({ video }) {
    return (
        <Link to={`/watch/${video.id.videoId}`}>
            <div className="film-card">
                <img src={video.snippet.thumbnails.medium.url} />
                <p>{video.snippet.title}</p>
            </div>
        </Link>
    );
}
