import './App.css';
import Footer from './components/Footer'
import Display from './components/Display'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <h1>Ark Invest Tracker</h1>
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
