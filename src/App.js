import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from './nav';
import About from './about';

function App() {
  return (
    <>
     <Router>
        <Nav></Nav>
        <div id="colorlib-main">
       <About></About>
        </div>
      </Router>
    </>
  );
}

export default App;
