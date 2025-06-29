import { useState } from 'react';
import FormProduct from './components/FormProduct';
import ListProduct from './components/ListProduct';

function App() {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = (product) => {
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = product;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, product]);
    }
  };

  const handleDelete = (index) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h1 className="text-center">Quản lý sản phẩm</h1>
      <FormProduct
        onSubmit={handleAddOrUpdate}
        editingProduct={editingIndex !== null ? products[editingIndex] : null}
      />
      <ListProduct
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
