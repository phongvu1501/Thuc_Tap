import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';

export default function App() {
  return (
    <Router>
      <div className="max-w-xl mx-auto p-6">
        <nav className="flex justify-between mb-6">
          <Link to="/" className="text-blue-600 font-semibold">Sản phẩm</Link>
          <Link to="/add" className="btn btn-success text-white mx-2 mb-2">Thêm</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}
