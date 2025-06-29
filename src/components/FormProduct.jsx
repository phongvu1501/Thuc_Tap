import React, { useState } from 'react';

function FormProduct({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) return;

    onAdd({ name, price: parseFloat(price) });
    setName('');
    setPrice('');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='form-label'>Tên sản phẩm:</label>
        <input className='form-control'
          placeholder='Nhập tên sản phẩm'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label className='form-label'>Giá:</label>
        <input className='form-control'
          placeholder='Nhập giá sản phẩm'
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className='btn btn-primary mt-2' type="submit">Thêm sản phẩm</button>
    </form>
  );
}

export default FormProduct;
