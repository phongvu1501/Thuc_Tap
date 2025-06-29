function ListProduct({ products, onDelete, onEdit }) {
  return (
    <ul className="list-group mt-4">
      {products.map((product, index) => (
        <li key={index} className="list-group-item">
          {product.name} - {product.price} đ
          <button className="btn btn-warning btn-sm" onClick={() => onEdit(index)}>Sửa</button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(index)}>Xoá</button>
        </li>
      ))}
    </ul>
  );
}

export default ListProduct;
