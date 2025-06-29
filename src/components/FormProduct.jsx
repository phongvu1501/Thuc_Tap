import { useEffect, useState } from 'react';

function FormProduct({ onSubmit, editingProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    onSubmit({ name, price });
    setName('');
    setPrice('');
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input className='form-control mb-2'
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input className='form-control mb-2'
        type="number"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
      </button>
    </form>
  );
}

export default FormProduct;
