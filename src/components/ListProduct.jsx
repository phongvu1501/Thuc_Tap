import React from 'react';

export default function ListProduct({ products, onDelete }) {
  if (products.length === 0) return <p>Chưa có sản phẩm nào</p>;



  return (
    <ul className='list-unstyled'>
      {products.map((product) => (
        <li
          key={product._id}
          className='mb-4'
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            marginBottom: '10px',
            ':hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <strong>{product.name}</strong> <br />
          Giá: {product.price.toLocaleString()}₫ <br />
          Mô tả : <em>{product.description}</em> <br />
          <small>Tạo lúc: {new Date(product.createdAt).toLocaleString()}</small>
          <button className='btn btn-danger' onClick={() => onDelete(product.id)}>Xóa</button>
        </li>
      ))}
    </ul>
  );
}
