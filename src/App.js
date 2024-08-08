import './App.css';
import RedirectRoute from './routes/RedirectRoute';
import LoginPage from './components/Login';
import { Routes, Route } from "react-router-dom";
import HomePage from './components/Home/HomePage';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<RedirectRoute path="/" />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
