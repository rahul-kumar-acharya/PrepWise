import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Footer() {

    useEffect(() => {
        if (!document.title.includes("AcharyaWorks") && !document.title.includes("|")) {
            document.title = "PrepWise | Interactive Tech & HR Interview Prep | AcharyaWorks";
        }
    }, []);
    
    return (
        <footer className="relative border-t border-gray-200 bg-white overflow-hidden pt-12 pb-8">
            {/* Subtle background glow for a "Modern SaaS" look */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
                    {/* Brand Info */}
                    <div className="flex flex-col items-start gap-4">
                        <Link to="/" className="text-2xl font-black tracking-tight text-indigo-600">
                            Prep<span className="text-gray-900">Wise</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            An interactive interview preparation platform designed to help developers master technical, behavioral, and practical coding rounds.
                        </p>
                    </div>

                    {/* Quick Navigation / Site Links */}
                    <div className="space-y-4">
                        <h5 className="text-xs font-mono uppercase tracking-widest text-gray-400">// Quick Links</h5>
                        <ul className="space-y-2 text-sm text-gray-600 font-semibold">
                            <li>
                                <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/choose-domain" className="hover:text-indigo-600 transition-colors">Choose Tech Stack</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Preparation Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/hr" className="hover:text-indigo-600 transition-colors">STAR Behavioral Practice</Link>
                            </li>
                            <li>
                                <Link to="/coding" className="hover:text-indigo-600 transition-colors">Coding Challenges Lab</Link>
                            </li>
                        </ul>
                    </div>

                    {/* User Connect Section */}
                    <div className="space-y-4">
                        <h5 className="text-xs font-mono uppercase tracking-widest text-zinc-400">// Connect</h5>
                        <div className="space-y-3 text-sm text-zinc-500 font-semibold">
                            <p>
                                <a href="mailto:rahulkumaracharya199@gmail.com" className="hover:text-indigo-600 transition-colors">
                                    rahulkumaracharya199@gmail.com
                                </a>
                            </p>
                            <div className="flex gap-4 pt-2">
                                <a
                                    href="https://acharyaworks.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-indigo-600 transition-colors text-lg"
                                    title="AcharyaWorks Portfolio"
                                    aria-label="AcharyaWorks Portfolio"
                                >
                                    <i className="fa-solid fa-briefcase"></i>
                                </a>
                                <a
                                    href="https://linkedin.com/in/rahulkumaracharya/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-indigo-600 transition-colors text-lg"
                                    title="LinkedIn Profile"
                                    aria-label="LinkedIn Profile"
                                >
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a
                                    href="https://github.com/rahul-kumar-acharya"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-gray-900 transition-colors text-lg"
                                    title="GitHub Repository"
                                    aria-label="GitHub Repository"
                                >
                                    <i className="fab fa-github"></i>
                                </a>
                                <a
                                    href="https://www.instagram.com/acharyarahul.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-pink-500 transition-colors text-lg"
                                    title="Instagram Profile"
                                    aria-label="Instagram Profile"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-medium text-gray-500 gap-2">
                    <p>© 2026 PrepWise by <a href="https://acharyaworks.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">AcharyaWorks</a> (Rahul Kumar Acharya). All rights reserved.</p>
                    <p>Made with ❤️ for software developers.</p>
                </div>
            </div>
        </footer>
    );
}
