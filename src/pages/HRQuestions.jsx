import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiUsers, FiMessageCircle, FiChevronDown, FiStar, FiArrowLeft, FiSearch, FiCheckCircle } from "react-icons/fi";
import { updateSEO } from "../utils/seo";
import { getCompletedQuestions, toggleCompletedQuestion } from "../utils/storage";
import hrQuestions from "../data/hrQuestions";

export default function HRQuestions({ domain }) {
    const [openId, setOpenId] = useState(null);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("all");
    const [completed, setCompleted] = useState(() => getCompletedQuestions());

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
                <Link to="/choose-domain" className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm">
                    Select Tech Stack
                </Link>
            </div>
        );
    }

    const filtered = hrQuestions.filter(q => {
        const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) || 
                              q.answer.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty = difficulty === "all" || q.difficulty.toLowerCase() === difficulty.toLowerCase();
        return matchesSearch && matchesDifficulty;
    });

    const handleToggleComplete = (e, qId) => {
        e.stopPropagation();
        const key = `hr_${qId}`;
        const updated = toggleCompletedQuestion(key);
        setCompleted(updated);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8">
                <FiArrowLeft /> Back to Dashboard
            </Link>
            
            {/* --- Header Section --- */}
            <header className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                        <FiMessageCircle size={24} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Soft Skills & HR</span>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                            Behavioral <span className="text-rose-500">Mastery</span>
                        </h1>
                    </div>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">
                    Prepare for the "culture fit" round with structured responses for <span className="text-gray-900 font-bold capitalize">{domain}</span> roles.
                </p>
            </header>

            {/* --- Search & Difficulty Filter Bar --- */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text"
                        placeholder="Search behavioral questions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-rose-400 transition-colors"
                    />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {["all", "easy", "medium", "hard"].map((level) => (
                        <button
                            key={level}
                            onClick={() => setDifficulty(level)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all capitalize ${
                                difficulty === level 
                                    ? "bg-rose-500 text-white shadow-sm" 
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Questions Grid --- */}
            {filtered.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-bold text-base">No questions found matching "{search}"</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((q, index) => {
                        const isDone = completed.includes(`hr_${q.id}`);
                        return (
                            <motion.div
                                layout
                                key={q.id}
                                className={`bg-white rounded-[2rem] border-2 transition-all duration-300 ${
                                    openId === q.id 
                                        ? "border-rose-400 shadow-xl shadow-rose-500/5" 
                                        : isDone ? "border-emerald-200 bg-emerald-50/20" : "border-gray-100 hover:border-gray-200"
                                }`}
                            >
                                {/* Question Header */}
                                <div
                                    onClick={() => setOpenId(openId === q.id ? null : q.id)}
                                    className="w-full p-6 sm:p-8 flex justify-between items-center text-left cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={(e) => handleToggleComplete(e, q.id)}
                                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                                isDone 
                                                    ? "bg-emerald-500 text-white shadow-sm" 
                                                    : "bg-gray-100 text-gray-300 hover:text-emerald-500"
                                            }`}
                                            title={isDone ? "Mark as Incomplete" : "Mark as Mastered"}
                                        >
                                            <FiCheckCircle size={16} />
                                        </button>
                                        <h3 className={`text-lg font-black tracking-tight leading-tight transition-colors ${
                                            openId === q.id ? "text-rose-600" : isDone ? "text-emerald-900" : "text-gray-900"
                                        }`}>
                                            {q.question}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <DifficultyBadge level={q.difficulty} />
                                        <FiChevronDown className={`text-gray-400 transition-transform ${openId === q.id ? "rotate-180 text-rose-500" : ""}`} />
                                    </div>
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
        <span className={`hidden xs:inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${levels[level.toLowerCase()]}`}>
            {level}
        </span>
    );
}
