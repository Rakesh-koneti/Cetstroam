import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { useAuth } from '../lib/auth-context';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const navigation = [
    { name: 'Home', href: '/', icon: BookOpen },
    { name: 'Practice Tests', href: '/exams', icon: GraduationCap },
    ...(isAuthenticated ? [{ name: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard }] : []),
  ];

  return (
    <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <div className="pt-16">
        {/* Navigation */}
        <nav className={`${isDark ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <Link
                  to="/"
                  className="flex items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} hover:text-violet-600 transition-colors`}>
                    CETStrom
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden sm:ml-8 sm:flex sm:items-center sm:space-x-4">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-violet-600 text-white'
                            : isDark
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'text-gray-600 hover:bg-violet-50 hover:text-violet-600'
                        }`}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                      : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                  }`}
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Auth Button */}
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/admin/login"
                    className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isDark
                        ? 'bg-violet-600 text-white hover:bg-violet-500'
                        : 'bg-violet-600 text-white hover:bg-violet-700'
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    Admin Login
                  </Link>
                )}

                {/* Mobile menu button */}
                <button
                  className={`sm:hidden p-2 rounded-lg transition-colors ${
                    isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-violet-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden">
              <div className={`space-y-1 pb-3 pt-2 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 px-3 rounded-md mx-2 transition-colors ${
                        isActive
                          ? 'bg-violet-600 text-white'
                          : isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-violet-50 hover:text-violet-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left block py-2 px-3 rounded-md mx-2 transition-colors ${
                      isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-violet-50 hover:text-violet-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <LogOut className="mr-3 h-5 w-5" />
                      Logout
                    </div>
                  </button>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-md mx-2 transition-colors ${
                      isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-violet-50 hover:text-violet-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <LogIn className="mr-3 h-5 w-5" />
                      Admin Login
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  CETStrom
                </span>
              </div>
              <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Your comprehensive online examination platform. Practice tests, instant results, and detailed analytics to help you succeed.
              </p>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className="mt-4 space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`text-sm ${
                        isDark
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="mailto:krakesh.gates@gmail.com"
                    className={`text-sm ${
                      isDark
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    krakesh.gates@gmail.com
                  </a>
                </li>
                <li>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    Developed by Rakesh Koneti
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`mt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-8`}>
            <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} CETStrom by Rakesh Koneti. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}