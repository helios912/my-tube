import { useParams } from 'react-router-dom';

export default function Watch() {
    const { id } = useParams();

    return (
        <div
            style={{
                padding: 20,
                background: 'black',
            }}
        >
            <iframe
                width="100%"
                height="800"
                borderRadius="50"
                src={`https://www.youtube.com/embed/${id}`}
                allowFullScreen
            />
        </div>
    );
}
