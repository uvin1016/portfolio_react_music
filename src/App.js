import './css/style.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/Main';
import AddMusic from './components/AddMusic';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Header />
      <AddMusic />
      <Main />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
