import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CreateBlog from './CreateBlog';
import About from './About';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (<Router>
    <Routes>
      <Route element={<Login />} path='/' exact />
      <Route element={<Register />} path='/register'/>
      <Route element={<ProtectedRoutes/>}>
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<CreateBlog />} path='/dashboard/create' exact/>
        <Route element={<About />} path='/dashboard/about' exact/>
      </Route>
    </Routes>
  </Router>);
}

export default App;
