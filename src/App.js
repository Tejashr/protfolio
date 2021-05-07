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
import Introduction from './intro';

function App() {
  return (
    <>
      <Router>
        <div id="colorlib-page">
          <div id="container-wrap">
            <Nav></Nav>
            <div id="colorlib-main">
            <Introduction></Introduction>
              <About></About>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
