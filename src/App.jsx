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


import Layout from './components/layout';
import ProductList from './components/ProdcutList';
// import './index.css';

export default function App() {
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
}
