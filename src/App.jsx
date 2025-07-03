import React, { useEffect } from 'react';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Gửi POST tới /api/product
    fetch('http://localhost:1337/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Nếu có token, thêm dòng dưới:
        // Authorization: 'Bearer your_token',
      },
      body: JSON.stringify({
        name: 'Sản phẩm React',
        price: 150000,
        description: 'Sản phẩm React cơ bản',
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('✅ Kết quả API:', data);
      })
      .catch(err => {
        console.error('❌ Lỗi API:', err);
      });
  }, []);

  return (
    <div className="App">
      <h1>🛍️ Tạo Sản Phẩm</h1>
      <p>Kiểm tra console để xem phản hồi từ API.</p>
      <Footer />
    </div>
  );
}

export default App;
