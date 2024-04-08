import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Notestate from './context/notes/Notesstate';
import Login from './Components/Login';
import Sign from './Components/Sign';
function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signUp' element={<Sign />} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}
export default App;
