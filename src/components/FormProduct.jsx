import React, { useState } from 'react';

export default function FormProduct({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    }

    const newProduct = {
      name,
      price: Number(price),
      description,
    };

    onAddProduct(newProduct);

    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='mb-3'>
        <input className='form-control'
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>
      <div className='mb-3'>
        <input className='form-control'
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          autoFocus
          min="0"
        />
      </div>
      <div className='mb-3'>
        <textarea
          className='form-control'
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
        />
      </div>
      <button className='btn btn-primary' type="submit">Thêm sản phẩm</button>
    </form>
  );
}
