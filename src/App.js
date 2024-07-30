import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main/Main'
import Home from './main/Home'
import Login from './main/Login'
import Forgot from './main/Forgot'
import Register from './main/Register'
import Write from './main/Write'
import { RecoilRoot } from "recoil"

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' className element={<Home />} />
          <Route path='/main' className element={<Main />} />
          <Route path='/login' className element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>  
  );
}

export default App;
