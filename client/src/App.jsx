import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Game from './pages/Game'
import Join from './pages/Join'
import Gameover from './pages/Gameover'
import io from 'socket.io-client'
import './styles/main.css'

function App() {
  const socket = io('http://localhost:5000')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join socket={socket} />} />
        <Route path="/game" element={<Game socket={socket} />} />
        <Route path="/gameover" element={<Gameover socket={socket} />} />
      </Routes>
    </Router>
  )
}

export default App
