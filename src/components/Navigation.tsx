import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Scale, 
  Home,
  Upload, 
  Search, 
  FileText, 
  User, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: Home,
      description: 'Overview'
    },
    { 
      name: 'Documents', 
      path: '/documents', 
      icon: Upload,
      description: 'Manage Files' 
    },
    { 
      name: 'AI Search', 
      path: '/ai-legal-search', 
      icon: Search,
      description: 'Legal Search' 
    },
    { 
      name: 'Contracts', 
      path: '/contract-analysis', 
      icon: FileText,
      description: 'Analysis' 
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: User,
      description: 'Account' 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings,
      description: 'Preferences' 
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-primary shadow-legal sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Home Button */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/dashboard')}
              className="flex items-center space-x-3 text-white hover:text-secondary transition-colors group"
            >
              <div className="relative">
                <Scale className="h-8 w-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold">Legal Research</span>
                <div className="text-xs text-white/80">Indian Law System</div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  title={item.description}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden lg:block">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* User Info and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white text-sm font-medium">
                {user?.name?.split(' ')[0]}
              </div>
              <div className="text-white/70 text-xs">
                {user?.role}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden lg:block">Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-primary/90 backdrop-blur-sm rounded-lg mt-2 mb-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-left transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-white/60">{item.description}</div>
                    </div>
                  </button>
                );
              })}
              
              {/* Mobile User Info and Logout */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="px-3 py-2 text-white">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-white/70">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;