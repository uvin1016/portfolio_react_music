import './css/style.css';
import {Route} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Chat from './components/chat/Chat';
import Panels from './components/main/Panels';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    document.querySelector("body").classList.remove("first");
    const mask = document.querySelector(".mask");
    if(mask){
      setTimeout(()=>{
        mask.classList.add("off");
        setTimeout(()=>{
          mask.remove();
        },1000)
      },1000)
    }
  },[]);

  return (
    <div className="App">
      <Header />

      <Route exact path="/" component={Panels} />
      <Route path="/chat" component={Chat} />
      
      <Footer />
    </div>
  );
}

export default App;