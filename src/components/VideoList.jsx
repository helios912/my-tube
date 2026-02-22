import VideoCard from './VideoCard';

export default function VideoList({ videos }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 10,
                background: 'black',
                color: 'white',
            }}
        >
            {videos.map((v) => (
                <VideoCard key={v.id.videoId} video={v} />
            ))}
        </div>
    );
}
