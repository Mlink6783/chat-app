import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Inbox from './pages/Inbox';
import ChatPage from './pages/ChatPage';

function App() {
  const isLoggedIn = localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/inbox" /> : <Login />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;