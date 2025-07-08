import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import ProductEdit from './pages/ProductEdit';
import ProductShow from './pages/ProductShow';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LogoutButton from './components/LogoutButton';
import PrivateRoute from './components/PrivateRoute';

import { ThemeProvider } from './utils/ThemeContext'; // ✅ thêm dòng này
import './styles/darkmode.css'; // ✅ giữ nguyên

export default function App() {
  return (
    <ThemeProvider> {/* ✅ Bọc toàn bộ ứng dụng */}
      <Router>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/logout" element={<LogoutButton />} />

            {/* Private routes */}
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />

            <Route path="/products" element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            } />

            <Route path="/add" element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } />

            <Route path="/edit/:id" element={
              <PrivateRoute>
                <ProductEdit />
              </PrivateRoute>
            } />

            <Route path="/show/:id" element={
              <PrivateRoute>
                <ProductShow />
              </PrivateRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
