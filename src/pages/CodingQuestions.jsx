import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCode, FiCopy, FiCheck, FiExternalLink, FiTerminal, FiArrowLeft } from "react-icons/fi";
import { updateSEO } from "../utils/seo";
import codingQuestions from "../data/codingQuestions";

export default function CodingQuestions({ domain }) {
    const [openId, setOpenId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        if (domain) {
            const formattedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
            updateSEO({
                title: `${formattedDomain} Coding Challenges & Solution Snippets | PrepWise Lab`,
                description: `Solve practical ${formattedDomain} coding challenges on PrepWise. Practice with dark-theme syntax previews, copyable code snippets, and structured solutions.`,
                keywords: `${formattedDomain} Coding Challenges, Practical Code Snippets, Coding Lab, Solution Modeling, PrepWise`,
                path: "/coding"
            });
        }
    }, [domain]);

    if (!domain) return <Navigate to="/dashboard" replace />;

    const filtered = codingQuestions.filter(q => q.domain === domain);

    const handleCopy = (id, code) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8">
                <FiArrowLeft /> Back to Dashboard
            </Link>

            {/* --- Header Section --- */}
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <FiTerminal size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Practice Lab</span>
                        <h1 className="text-3xl font-black text-gray-900 capitalize tracking-tight">
                            {domain} <span className="text-indigo-600">Challenges</span>
                        </h1>
                    </div>
                </div>
                <p className="text-gray-500 font-medium">
                    Sharpen your logic with industry-standard coding patterns.
                </p>
            </header>

            {/* --- Questions List --- */}
            {filtered.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-bold text-lg">No challenges found for this domain yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filtered.map((q, index) => (
                        <motion.div
                            layout
                            key={q.id}
                            className={`bg-white rounded-[2rem] border-2 transition-all duration-300 ${
                                openId === q.id ? "border-indigo-500 shadow-xl shadow-indigo-500/5" : "border-gray-100 hover:border-gray-200"
                            }`}
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => setOpenId(openId === q.id ? null : q.id)}
                                className="w-full p-6 sm:p-8 flex justify-between items-center text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-xs font-black text-gray-400 border border-gray-100">
                                        {index + 1}
                                    </span>
                                    <h3 className={`text-lg font-black tracking-tight transition-colors ${openId === q.id ? "text-indigo-600" : "text-gray-900"}`}>
                                        {q.question}
                                    </h3>
                                </div>
                                <DifficultyBadge level={q.difficulty} />
                            </button>

                            {/* Answer Section (The "Editor") */}
                            <AnimatePresence>
                                {openId === q.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-8 sm:px-8 sm:pb-10">
                                            <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-2xl">
                                                {/* Editor Top Bar */}
                                                <div className="bg-[#2D2D2D] px-4 py-3 flex items-center justify-between border-b border-white/5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex gap-1.5">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                                                        </div>
                                                        <span className="ml-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                                                            <FiCode /> solution.js
                                                        </span>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleCopy(q.id, q.answer)}
                                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold"
                                                    >
                                                        {copiedId === q.id ? <><FiCheck className="text-green-400" /> Copied</> : <><FiCopy /> Copy</>}
                                                    </button>
                                                </div>
                                                
                                                {/* Code Content */}
                                                <pre className="p-6 text-sm sm:text-base overflow-x-auto font-mono leading-relaxed text-indigo-300 custom-scrollbar">
                                                    <code>{q.answer}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}
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
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border shadow-sm ${levels[level.toLowerCase()]}`}>
            {level}
        </span>
    );
}
