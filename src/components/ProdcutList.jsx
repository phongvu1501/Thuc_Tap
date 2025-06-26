
import React from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList() {

    const ProductList = [
        { id: 1, name: 'Áo thun', price: 200000 },
        { id: 2, name: 'Quần jean', price: 350000 },
        { id: 3, name: 'Giày thể thao', price: 500000 },
    ]

    return (
        <div className='container'>
            <h1>Danh sách sản phẩm</h1>
            <table className='table table-striped'>
                <thead>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá sản phẩm</th>
                </thead>
                <tbody>
                    {ProductList.map((product, index) => (
                        <tr key= {product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
export default ProductList;

