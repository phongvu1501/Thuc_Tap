// import React from 'react'
// import Bai1 from './components/bai1'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductList from './components/ProdcutList';

// // import './App.css'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         {/* <Route path="/about" element={<About />} /> */}

// <Route path="/productList" element={<ProductList />} />

//         <Route path="/app" element={<Bai1 />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App


import React, { useState } from 'react';
import FormProduct from './components/FormProduct';
import ListProduct from './components/ListProduct';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý sản phẩm</h1>
      <FormProduct onAdd={handleAddProduct} />
      <ListProduct items={products} />
    </div>
  );
}

export default App;

