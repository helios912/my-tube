import axios from 'axios';

const KEY = 'AIzaSyA3m_WR5QA30_rrW-Ogce490BVl1xde5LE';

export const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: KEY,
        part: 'snippet',
        maxResults: 50,
    },
});
