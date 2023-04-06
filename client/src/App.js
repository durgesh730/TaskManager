import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home';
import './App.css'
import AddTask from './component/AddTask';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/addtask' element={<AddTask/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
