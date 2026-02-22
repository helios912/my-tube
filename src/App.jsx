import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Header from './components/Header';
import Search from './pages/Search';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watch/:id" element={<Watch />} />
            </Routes>
        </>
    );
}
