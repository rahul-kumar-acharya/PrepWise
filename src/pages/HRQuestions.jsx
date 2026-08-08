import { useState, useEffect  } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiUsers, FiMessageCircle, FiInfo, FiChevronDown, FiStar, FiArrowLeft } from "react-icons/fi";
import { updateSEO } from "../utils/seo";
import hrQuestions from "../data/hrQuestions";

export default function HRQuestions({ domain }) {
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        const domainLabel = domain ? `${domain.charAt(0).toUpperCase() + domain.slice(1)} ` : "";
        updateSEO({
            title: `${domainLabel}Behavioral & HR Interview Practice (STAR Method) | PrepWise`,
            description: `Master the HR & culture fit round for ${domain || 'tech'} engineering roles using the STAR method (Situation, Task, Action, Result) with PrepWise.`,
            keywords: "HR Behavioral Questions, STAR Method, Tell Me About Yourself, Cultural Fit Interview, Soft Skills for Software Developers, PrepWise",
            path: "/hr"
        });
    }, [domain]);

    if (!domain) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <FiUsers size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">No Domain Selected</h3>
                <p className="text-gray-500 max-w-xs mt-2 font-medium">
                    Please choose a technical domain first so we can tailor the HR context for you.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8">
                <FiArrowLeft /> Back to Dashboard
            </Link>
            
            {/* --- Header Section --- */}
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                        <FiMessageCircle size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Soft Skills</span>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                            Behavioral <span className="text-rose-500">Mastery</span>
                        </h1>
                    </div>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">
                    Prepare for the "culture fit" round with structured responses for <span className="text-gray-900 font-bold capitalize">{domain}</span> roles.
                </p>
            </header>

            {/* --- Questions Grid --- */}
            <div className="space-y-6">
                {hrQuestions.map((q, index) => (
                    <motion.div
                        layout
                        key={q.id}
                        className={`bg-white rounded-[2rem] border-2 transition-all duration-300 ${
                            openId === q.id ? "border-rose-400 shadow-xl shadow-rose-500/5" : "border-gray-100 hover:border-gray-200"
                        }`}
                    >
                        {/* Question Header */}
                        <button
                            onClick={() => setOpenId(openId === q.id ? null : q.id)}
                            className="w-full p-6 sm:p-8 flex justify-between items-center text-left"
                        >
                            <div className="flex items-center gap-5">
                                <span className="hidden sm:flex w-10 h-10 rounded-xl bg-rose-50 items-center justify-center text-xs font-black text-rose-500 border border-rose-100">
                                    {index + 1}
                                </span>
                                <h3 className={`text-lg font-black tracking-tight leading-tight transition-colors ${openId === q.id ? "text-rose-600" : "text-gray-900"}`}>
                                    {q.question}
                                </h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <DifficultyBadge level={q.difficulty} />
                                <FiChevronDown className={`text-gray-400 transition-transform ${openId === q.id ? "rotate-180 text-rose-500" : ""}`} />
                            </div>
                        </button>

                        {/* Answer Section */}
                        <AnimatePresence>
                            {openId === q.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-8 sm:px-8 sm:pb-10">
                                        <div className="bg-gray-50 rounded-[1.5rem] p-6 border border-gray-100 relative overflow-hidden">
                                            {/* STAR Badge */}
                                            <div className="flex items-center gap-2 mb-4 text-rose-500">
                                                <FiStar className="fill-current" size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Recommended Strategy: STAR Method</span>
                                            </div>

                                            <p className="text-gray-600 leading-relaxed font-medium mb-6 italic">
                                                "{q.answer}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function DifficultyBadge({ level }) {
    const levels = {
        easy: "text-emerald-600 bg-emerald-50 border-emerald-100",
        medium: "text-amber-600 bg-amber-50 border-amber-100",
        hard: "text-rose-600 bg-rose-50 border-rose-100",
    };

    return (
        <span className={`hidden xs:inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${levels[level.toLowerCase()]}`}>
            {level}
        </span>
    );
}
