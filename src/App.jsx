import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChooseDomain from "./pages/ChooseDomain";
import HRQuestions from "./pages/HRQuestions";
import TechQuestions from "./pages/TechQuestions";
import CodingQuestions from "./pages/CodingQuestions";
import { useState } from "react";
import { getStoredDomain, setStoredDomain } from "./utils/storage";

function App() {
    const [domain, setDomainState] = useState(() => getStoredDomain());

    const handleSetDomain = (newDomain) => {
        setDomainState(newDomain);
        setStoredDomain(newDomain);
    };

    return (
        <>
            <Navbar domain={domain} setDomain={handleSetDomain} />

            <div className="pt-20 min-h-[calc(100vh-200px)]">
                <Routes>
                    <Route path="/" element={<Home domain={domain} />} />
                    <Route
                        path="/dashboard"
                        element={<Dashboard domain={domain} setDomain={handleSetDomain} />}
                    />
                    <Route 
                        path="/choose-domain" 
                        element={<ChooseDomain setDomain={handleSetDomain} />} 
                    />
                    <Route
                        path="/hr"
                        element={<HRQuestions domain={domain} />}
                    />
                    <Route
                        path="/coding"
                        element={<CodingQuestions domain={domain} />}
                    />
                    <Route
                        path="/tech"
                        element={<TechQuestions domain={domain} />}
                    />
                </Routes>
            </div>

            <Footer />
        </>
    );
}

export default App;
