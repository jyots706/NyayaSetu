import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import LanguageSelector from '../components/LanguageSelector';

const DashboardLayout = () => {
    const { user, logout } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { path: '/dashboard', label: 'Overview', icon: '🏠', exact: true },
        { path: '/dashboard/voice', label: 'Voice Input', icon: '🎤' },
        { path: '/dashboard/documents', label: 'Document Upload', icon: '📄' },
        { path: '/dashboard/legal-help', label: 'AI Legal Help', icon: '⚖️' },
        { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <h1 className="text-xl font-bold text-blue-600 tracking-tight">NyayaSetu</h1>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.exact}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                                        isActive 
                                            ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50' 
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-4">
                    <LanguageSelector />

                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/50 to-slate-100/50 relative">
                {/* The Outlet renders the child routes */}
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
