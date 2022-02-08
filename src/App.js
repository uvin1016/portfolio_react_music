import './css/style.css';
import {Route} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Board from './components/board/Board';
import Panels from './components/main/Panels';

function App() {
  return (
    <div className="App">
      <Header />

      <Route exact path="/" component={Panels} />
      <Route path="/board" component={Board} />
      
      <Footer />
    </div>
  );
}

export default App;
