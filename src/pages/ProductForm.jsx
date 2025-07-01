import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/product/${id}`)
        .then(res => setForm(res.data))
        .catch(() => alert('Không tìm thấy sản phẩm'));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/product/${id}`, form);
        alert('Đã cập nhật sản phẩm!');
      } else {
        await api.post('/product', form);
        alert('Đã thêm sản phẩm!');
      }
      navigate('/');
    } catch {
      alert('Có lỗi xảy ra!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" />
      <Input name="price" value={form.price} onChange={handleChange} placeholder="Giá" />
      <Input name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" />
      <button type="submit" className="btn btn-primary">{isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
    </form>
  );
}
