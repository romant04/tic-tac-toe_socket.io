import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Join from "./pages/Join";
import "./styles/main.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Join />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    );
}

export default App;
