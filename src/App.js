import './css/style.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Board from './components/Board';
import AddBoard from './components/AddBoard';
import Panels from './components/main/Panels';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Panels />
      </main>
      <section>
        <AddBoard />
        <Board />
      </section>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
