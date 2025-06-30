import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormProduct from './components/FormProduct';
import ListProduct from './components/ListProduct';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gọi API để lấy danh sách
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:1337/api/product'); // API
      setProducts(res.data);
    } catch (err) {
      alert('Lỗi khi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm thêm sản phẩm
  const handleAddProduct = async (product) => {
    try {
      await axios.post('http://localhost:1337/api/product', product);
      fetchProducts();
    } catch (err) {
      alert('Lỗi khi thêm sản phẩm');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Danh sách sản phẩm</h2>
      <FormProduct onAddProduct={handleAddProduct} />
      {loading ? <p>Đang tải dữ liệu...</p> : <ListProduct products={products} />}
    </div>
  );
}
