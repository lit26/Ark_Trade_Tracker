import "./App.css";
import Footer from "./components/Footer";
import Display from "./components/Display";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef } from "react";


function Donate() {
  
  const ref = useRef();
  useEffect(() => {
    if (ref && ref.current) {
      const button = document.getElementById('buymeacoffee');
      button.style.display = '';
      ref.current.appendChild(button);
    }
  }, [ref]);

  return <div ref={ref} />;
}

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>Ark Trade Tracker</h1>
        <Donate />
      </div>
      <div className="Content">
        <div>
          <Display />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
