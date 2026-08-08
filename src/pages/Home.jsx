import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiCode, FiCpu, FiUsers, FiArrowRight } from "react-icons/fi";
import { updateSEO } from "../utils/seo";

export default function Home() {

    useEffect(() => {
        updateSEO({
            title: "PrepWise - Interactive Tech & HR Interview Preparation Platform",
            description: "Master software engineering interviews with PrepWise. Practice role-based technical questions, STAR-method HR behavioral responses, and practical coding exercises across 12+ tech stacks.",
            keywords: "PrepWise, Tech Interview Preparation, HR Behavioral Questions, STAR Method, Software Developer Prep, React Interview, Python Interview, AcharyaWorks, Rahul Kumar Acharya",
            path: "/"
        });
    }, []);

    return (
        <div className="relative overflow-hidden bg-white">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* --- Hero Section --- */}
                <section className="relative pt-8 pb-10 lg:pt-16 lg:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-bold text-indigo-700 bg-indigo-100/50 border border-indigo-200 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                            </span>
                            Interview Preparation
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Interview</span> Game.
                        </h1>

                        <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-lg">
                            Stop memorizing, start mastering. PrepWise uses data-driven insights to help you ace HR, Technical, and System Design rounds.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/dashboard"
                                className="group px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 w-max"
                            >
                                Start Preparing Now
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 flex items-center gap-6 text-gray-400">
                            <p className="text-xs font-bold uppercase tracking-widest">Trusted by students from</p>
                        </div>
                    </motion.div>

                    {/* Right Visual - Layered Dashboard Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-[#0d1117] rounded-[2.5rem] p-8 shadow-2xl border border-gray-800 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Window dots */}
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600" />
                                <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
                            </div>
                            
                            {/* Code editor look */}
                            <div className="font-mono text-[13px] sm:text-sm text-gray-300 space-y-1.5 leading-relaxed tracking-wide">
                                <p><span className="text-pink-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) {'{'}</p>
                                <p className="pl-4"><span className="text-pink-400">const</span> map = <span className="text-pink-400">new</span> Map();</p>
                                <p className="pl-4"><span className="text-pink-400">for</span> (<span className="text-pink-400">let</span> i = 0; i &lt; nums.length; i++) {'{'}</p>
                                <p className="pl-8"><span className="text-pink-400">const</span> comp = target - nums[i];</p>
                                <p className="pl-8"><span className="text-pink-400">if</span> (map.has(comp)) {'{'}</p>
                                <p className="pl-12 text-green-300"><span className="text-pink-400">return</span> [map.get(comp), i];</p>
                                <p className="pl-8">{'}'}</p>
                                <p className="pl-8">map.set(nums[i], i);</p>
                                <p className="pl-4">{'}'}</p>
                                <p>{'}'}</p>
                            </div>
                            
                            {/* Run Result Bottom Bar */}
                            <div className="mt-8 pt-5 border-t border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                    <FiCheckCircle />
                                    <span>Accepted</span>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">Runtime: 58 ms</span>
                            </div>
                        </div>
                        {/* Floating Decoration */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500 rounded-full -z-10 blur-[3xl] opacity-20 animate-pulse" />
                    </motion.div>
                </section>

                {/* --- Features Section --- */}
                <section className="py-24">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-base font-bold text-indigo-600 uppercase tracking-widest mb-4">Core Modules</h2>
                        <h3 className="text-4xl font-black text-gray-900">Everything you need to land the offer.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Feature
                            icon={<FiUsers className="w-6 h-6" />}
                            title="HR & Behavioral"
                            desc="Master the 'Tell me about yourself' and STAR method questions with AI feedback."
                            color="indigo"
                        />
                        <Feature
                            icon={<FiCpu className="w-6 h-6" />}
                            title="Technical Core"
                            desc="Deep dives into OS, DBMS, Networking, and System Design patterns."
                            color="emerald"
                        />
                        <Feature
                            icon={<FiCode className="w-6 h-6" />}
                            title="DSA Practice"
                            desc="Curated lists from LeetCode and GFG specifically for top-tier companies."
                            color="amber"
                        />
                    </div>
                </section>

                {/* --- Final CTA --- */}
                <section className="mb-32">
                    <div className="relative bg-gray-900 rounded-[3rem] p-12 lg:p-24 overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />

                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                Don't leave your career to chance.
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                                Join thousands of engineers stepping up their game.
                            </p>
                            <Link
                                to="/dashboard"
                                className="inline-block bg-white text-gray-900 px-10 py-4 rounded-2xl font-black hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl"
                            >
                                Start Preparing Now
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function Feature({ icon, title, desc, color }) {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100"
    };

    return (
        <div className="group p-10 bg-white border border-gray-100 rounded-[2rem] hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-8 border transition-transform group-hover:scale-110 duration-300 ${colors[color]}`}>
                {icon}
            </div>
            <h4 className="text-xl font-black text-gray-900 mb-4">{title}</h4>
            <p className="text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}
