import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAppContext();

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white shadow-lg shadow-blue-200">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
                <p className="text-blue-100 text-lg">Here is an overview of your legal assistance journey.</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/dashboard/voice" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🎤</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Voice Input</h3>
                        <p className="text-sm text-slate-500">Record a statement for transcription</p>
                    </Link>

                    <Link to="/dashboard/documents" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">📄</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Upload Document</h3>
                        <p className="text-sm text-slate-500">Extract and summarize legal files</p>
                    </Link>

                    <Link to="/dashboard/legal-help" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">⚖️</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">AI Legal Help</h3>
                        <p className="text-sm text-slate-500">Ask questions and get draft templates</p>
                    </Link>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="text-lg font-medium">No recent activity found</p>
                    <p className="text-sm">Upload a document or record a voice statement to get started.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

