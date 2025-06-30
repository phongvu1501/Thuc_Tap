import React from 'react';

export default function ListProduct({ products }) {
  if (products.length === 0) return <p>Chưa có sản phẩm nào</p>;

  return (
    <ul className='list-unstyled'>
      {products.map((product) => (
        <li
          key={product._id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <strong>{product.name}</strong> <br />
          Giá: {product.price.toLocaleString()}₫ <br />
          Mô tả : <em>{product.description}</em> <br />
          <small>Tạo lúc: {new Date(product.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
