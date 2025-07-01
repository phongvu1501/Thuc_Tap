import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          const trimmed = keyword.trim();
          const res = trimmed
            ? await api.get(`/product/search/${encodeURIComponent(trimmed)}`)
            : await api.get('/product');
          setProducts(res.data);
          setPage(1);
        } catch (err) {
          console.error('Lỗi khi lấy sản phẩm:', err);
        }
      };
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [keyword]);

  const currentPageProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    return products.slice(start, start + perPage);
  }, [products, page]);

  const totalPages = useMemo(() => Math.ceil(products.length / perPage), [products]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có muốn xóa sản phẩm này không?");
    if (!confirm) return;
    try {
      await api.delete(`/product/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('Xoá thành công!');
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
      alert('Xoá thất bại!');
    }
  };

  return (
    <div>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full mb-4"
      />

      <ul className="space-y-2">
        {currentPageProducts.map((p) => (
          <li key={p.id} className="border p-4 flex justify-between items-center rounded">
            <span>{p.name}</span>
            <div className="space-x-2">
              <Link to={`/edit/${p.id}`}>
                <button className="btn btn-primary me-2">Sửa</button>
              </Link>
              <button className="btn btn-danger me-2" onClick={() => handleDelete(p.id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            className={`px-3 ${page === i + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
