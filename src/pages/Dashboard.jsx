import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserTie, FaLaptopCode, FaCode, FaExchangeAlt, FaArrowRight, FaRocket } from "react-icons/fa";
import { updateSEO } from "../utils/seo";

export default function Dashboard({ domain, setDomain }) {
    const navigate = useNavigate();

    useEffect(() => {
        const formattedDomain = domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "";
        const title = domain 
            ? `${formattedDomain} Preparation Dashboard | PrepWise` 
            : "Setup Your Interview Path | PrepWise";
            
        updateSEO({
            title,
            description: `Access your tailored ${formattedDomain || 'tech'} interview preparation roadmap. Practice STAR behavioral questions, core technical concepts, and coding challenges on PrepWise.`,
            keywords: `${formattedDomain || 'Tech'} Interview Roadmap, Behavioral STAR Prep, Core Technical Concepts, Coding Challenges, PrepWise`,
            path: "/dashboard"
        });
    }, [domain]);

    if (!domain) {
        return (
            <div className="flex items-center justify-center min-h-[90vh] px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 text-center"
                >
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl rotate-3">
                        <FaRocket />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                        Ready to level up?
                    </h2>
                    <p className="text-gray-500 mb-8 font-medium leading-relaxed">
                        To provide the most relevant questions and resources, we need to know your target role.
                    </p>
                    <button
                        onClick={() => navigate("/choose-domain")}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        Pick Your Domain <FaArrowRight className="text-sm" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 py-20"
        >
            {/* --- Header Section --- */}
            <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                            Personalized Path
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 capitalize tracking-tight">
                        {domain} <span className="text-indigo-600">Overview</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Welcome back! Here is your preparation roadmap for today.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setDomain(null);
                        navigate("/choose-domain");
                    }}
                    className="group flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-white border border-gray-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
                >
                    <FaExchangeAlt className="group-hover:rotate-180 transition-transform duration-500" />
                    Switch Domain
                </button>
            </header>

            {/* --- Action Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <DashboardCard
                    title="Behavioral"
                    subtitle="HR & Cultural Fit"
                    desc="Master soft skills and situational questions used by top tech firms."
                    icon={FaUserTie}
                    color="indigo"
                    onClick={() => navigate("/hr")}
                />
                <DashboardCard
                    title="Domain Core"
                    subtitle="Technical Concepts"
                    desc={`Deep dive into ${domain} fundamentals and architecture.`}
                    icon={FaLaptopCode}
                    color="emerald"
                    onClick={() => navigate("/tech")}
                />
                <DashboardCard
                    title="Coding Lab"
                    subtitle="Problem Solving"
                    desc="Hands-on practice with Data Structures and Algorithms."
                    icon={FaCode}
                    color="amber"
                    onClick={() => navigate("/coding")}
                />
            </div>
        </motion.div>
    );
}


function DashboardCard({ title, subtitle, desc, icon: Icon, color, onClick }) {
    const theme = {
        indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
        emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
        amber: "text-amber-600 bg-amber-50 border-amber-100"
    };

    return (
        <button
            onClick={onClick}
            className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 text-left hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 transition-transform group-hover:scale-110 duration-300 ${theme[color]}`}>
                <Icon size={24} />
            </div>
            
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                {subtitle}
            </span>
            <h3 className="text-2xl font-black text-gray-900 mt-1 mb-3">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{desc}</p>
            
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Start Practicing <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </div>
        </button>
    );
}

