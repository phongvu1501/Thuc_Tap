import React from 'react';

function ListProduct({ items }) {
    return (
        <div className="container">
            <h2 className="text-center">Danh sách sản phẩm</h2>
            <ul className="list-group">
                {items.map((product, index) => (
                    <li key={index} className="list-group-item">
                        {product.name} - {product.price.toLocaleString()} VNĐ
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListProduct;
