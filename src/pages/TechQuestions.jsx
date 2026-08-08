import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiChevronDown, FiCheckCircle, FiArrowLeft, FiSearch } from "react-icons/fi";
import { updateSEO } from "../utils/seo";
import { getCompletedQuestions, toggleCompletedQuestion } from "../utils/storage";
import technicalQuestions from "../data/technicalQuestions";

export default function TechQuestions({ domain }) {
    const [openId, setOpenId] = useState(null);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("all");
    const [completed, setCompleted] = useState(() => getCompletedQuestions());

    useEffect(() => {
        if (domain) {
            const formattedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
            updateSEO({
                title: `${formattedDomain} Technical Concepts & Architecture Questions | PrepWise`,
                description: `Master the architectural foundation and theoretical core of ${formattedDomain}. Explore expert explanations on key technical concepts with PrepWise.`,
                keywords: `${formattedDomain} Technical Questions, Core Concepts, Software Architecture, Technical Foundation, PrepWise`,
                path: "/tech"
            });
        }
    }, [domain]);

    if (!domain) return <Navigate to="/dashboard" replace />;

    const domainQuestions = technicalQuestions.filter(q => q.domain === domain);

    const filtered = domainQuestions.filter(q => {
        const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) || 
                              q.answer.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty = difficulty === "all" || q.difficulty.toLowerCase() === difficulty.toLowerCase();
        return matchesSearch && matchesDifficulty;
    });

    const handleToggleComplete = (e, qId) => {
        e.stopPropagation();
        const key = `tech_${domain}_${qId}`;
        const updated = toggleCompletedQuestion(key);
        setCompleted(updated);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8">
                <FiArrowLeft /> Back to Dashboard
            </Link>

            {/* --- Header Section --- */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                            <FiBookOpen size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Technical Foundation</span>
                            <h1 className="text-3xl font-black text-gray-900 capitalize tracking-tight">
                                {domain} <span className="text-indigo-600">Concepts</span>
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-500 font-medium">
                        Master the theoretical core and architectural patterns for <span className="text-gray-900 font-bold capitalize">{domain}</span>.
                    </p>
                </div>
            </header>

            {/* --- Search & Difficulty Filter Bar --- */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text"
                        placeholder={`Search ${domain} technical concepts...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {["all", "easy", "medium", "hard"].map((level) => (
                        <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all capitalize ${
                                difficulty === level 
                                    ? "bg-indigo-600 text-white shadow-sm" 
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Questions List --- */}
            {filtered.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-bold text-base">No technical concepts found matching your filters.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((q, index) => {
                        const isDone = completed.includes(`tech_${domain}_${q.id}`);
                        return (
                            <motion.div
                                layout
                                key={q.id}
                                className={`bg-white rounded-[2rem] border-2 transition-all duration-300 ${
                                    openId === q.id 
                                        ? "border-indigo-600 shadow-xl shadow-indigo-500/5" 
                                        : isDone ? "border-emerald-200 bg-emerald-50/20" : "border-gray-100 hover:border-gray-200"
                                }`}
                            >
                                {/* Question Header */}
                                <div
                                    onClick={() => setOpenId(openId === q.id ? null : q.id)}
                                    className="w-full p-6 sm:p-8 flex justify-between items-start text-left gap-4 cursor-pointer select-none"
                                >
                                    <div className="flex gap-4 items-start">
                                        <button
                                            onClick={(e) => handleToggleComplete(e, q.id)}
                                            className={`mt-1 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                                                isDone 
                                                    ? "bg-emerald-500 text-white shadow-sm" 
                                                    : "bg-gray-100 text-gray-300 hover:text-emerald-500"
                                            }`}
                                            title={isDone ? "Mark as Incomplete" : "Mark as Mastered"}
                                        >
                                            <FiCheckCircle size={14} />
                                        </button>

                                        <div>
                                            <h3 className={`text-lg font-black tracking-tight leading-snug transition-colors ${
                                                openId === q.id ? "text-indigo-600" : isDone ? "text-emerald-900" : "text-gray-900"
                                            }`}>
                                                {q.question}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-3">
                                                <DifficultyBadge level={q.difficulty} />
                                                {q.topic && (
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                                                        #{q.topic}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <FiChevronDown className={`mt-2 text-gray-400 transition-transform duration-300 ${openId === q.id ? "rotate-180 text-indigo-600" : ""}`} />
                                </div>

                                {/* Answer Section */}
                                <AnimatePresence>
                                    {openId === q.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-8 sm:px-10 sm:pb-10">
                                                <div className="relative p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                                    <div className="flex items-center gap-2 text-indigo-600 mb-4 font-black text-[10px] uppercase tracking-[0.2em]">
                                                        <FiCheckCircle size={14} /> Comprehensive Explanation
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed font-medium">
                                                        {q.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
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
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${levels[level.toLowerCase()]}`}>
            {level}
        </span>
    );
}
