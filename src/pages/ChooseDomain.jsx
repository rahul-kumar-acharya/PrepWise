import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { updateSEO } from "../utils/seo";
import { 
    FaReact, FaPython, FaJava, FaCode, FaLaptopCode, FaNodeJs, 
    FaJsSquare, FaHtml5, FaCss3Alt, FaDatabase, FaCloud, FaMobileAlt 
} from "react-icons/fa";

const domains = [
    { name: "Frontend", value: "frontend", icon: FaLaptopCode, desc: "HTML, CSS, JavaScript", color: "from-blue-500 to-cyan-400" },
    { name: "React", value: "react", icon: FaReact, desc: "Components, Hooks, State", color: "from-indigo-500 to-blue-500" },
    { name: "Python", value: "python", icon: FaPython, desc: "Core Python, OOP, Logic", color: "from-yellow-500 to-green-500" },
    { name: "Java", value: "java", icon: FaJava, desc: "Java, OOP, Collections", color: "from-red-500 to-orange-500" },
    { name: "Backend", value: "backend", icon: FaCode, desc: "APIs, Databases, Logic", color: "from-gray-700 to-gray-900" },
    { name: "Node.js", value: "node", icon: FaNodeJs, desc: "Server-side JS, Express", color: "from-green-600 to-emerald-400" },
    { name: "JavaScript", value: "javascript", icon: FaJsSquare, desc: "ES6+, DOM, Async", color: "from-yellow-400 to-orange-400" },
    { name: "HTML", value: "html", icon: FaHtml5, desc: "HTML5, Semantic tags", color: "from-orange-600 to-red-500" },
    { name: "CSS", value: "css", icon: FaCss3Alt, desc: "Flex, Grid, Animations", color: "from-blue-600 to-indigo-500" },
    { name: "Database", value: "database", icon: FaDatabase, desc: "SQL, NoSQL, Queries", color: "from-emerald-600 to-teal-500" },
    { name: "Cloud", value: "cloud", icon: FaCloud, desc: "AWS, Azure, Concepts", color: "from-sky-500 to-blue-400" },
    { name: "Mobile", value: "mobile", icon: FaMobileAlt, desc: "Android, iOS, Native", color: "from-purple-500 to-pink-500" },
];

export default function ChooseDomain({ setDomain }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    useEffect(() => {
        updateSEO({
            title: "Choose Your Tech Stack - 12+ Specialized Interview Domains | PrepWise",
            description: "Select your technology domain to begin. From Frontend and React to Python and Cloud—get specialized interview questions and roadmaps tailored to your focus.",
            keywords: "Choose Tech Stack, React Interview Questions, Python Developer Prep, Java Interview, Node.js Prep, Database SQL Questions, Cloud DevOps Interview, PrepWise",
            path: "/choose-domain"
        });
    }, []);

    const filteredDomains = domains.filter(d => 
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    function handleSelect(value) {
        setDomain(value);
        navigate("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-blue-50 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Heading Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        What’s your <span className="text-indigo-600">focus</span> today?
                    </h1>
                    <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
                        Select your expertise to unlock specialized interview questions and mock paths.
                    </p>

                    {/* Search Bar Upgrade */}
                    <div className="mt-10 max-w-md mx-auto relative group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Search technology..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                        />
                    </div>
                </motion.div>

                {/* Grid with AnimatePresence for smooth filtering */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredDomains.map((domain, index) => (
                            <motion.button
                                layout
                                key={domain.value}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                onClick={() => handleSelect(domain.value)}
                                className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 text-left hover:border-indigo-600 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex flex-col h-full overflow-hidden"
                            >
                                {/* Decorative Gradient Blobs on Hover */}
                                <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-500`} />
                                
                                <div className="mb-6 relative">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <domain.icon />
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-black text-gray-900 mb-2">{domain.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">{domain.desc}</p>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">Select Path</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <FiArrowRight />
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredDomains.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-gray-400 font-bold">No tech found matching "{search}"</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

