import Header from '../Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 p-3 bg-light">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
