import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Personal from "./components/Personal";

export default function RouterMenu() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Include the RouterPage component with nested routes */}
                <Route path="/personal" element={<Personal />} />
            </Routes>
        </Router>
    );
}
