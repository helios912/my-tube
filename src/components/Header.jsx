import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Search from '../pages/Search';

export default function Header() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        navigate(`/search?q=${query}`);
        setQuery('');
    };

    return (
        <header style={styles.header}>
            {/* Лого */}
            <Link to="." style={styles.logo}>
                ▶ MyTube
            </Link>

            <form onSubmit={handleSubmit} style={styles.searchForm}>
                <input
                    type="text"
                    placeholder="Пошук відео..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    🔍
                </button>
            </form>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: '#020202',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 10,
    },

    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'red',
        textDecoration: 'none',
    },

    searchForm: {
        display: 'flex',
        width: '50%',
    },

    input: {
        flex: 1,
        padding: '8px 12px',
        borderRadius: '20px 0 0 20px',
        border: '1px solid #333',
        background: '#333030',
        color: 'white',
        outline: 'none',
    },

    button: {
        padding: '8px 16px',
        borderRadius: '0 20px 20px 0',
        border: '1px solid #333',
        background: '#222',
        color: 'white',
        cursor: 'pointer',
    },
};
