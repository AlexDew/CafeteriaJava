import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import VendedorDashboard from './modules/vendedor/VendedorDashboard';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar modulo="vendedor" rol="Vendedor" />
      <main className="flex-grow-1">
        <VendedorDashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;