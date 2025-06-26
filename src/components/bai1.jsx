
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:1337/api/ping')
            .then(res => {
                setMessage(res.data.message);
            })
            .catch(err => {
                console.error('API error:', err);
                setMessage('Lỗi khi kết nối đến API');
            });
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Welcome to My CMS</h1>
            <p>API says: <strong>{message}</strong></p>
        </div>
    );
}

export default App;

