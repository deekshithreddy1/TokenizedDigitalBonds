import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Home, 
  PlusCircle, 
  RefreshCw, 
  Settings, 
  ShieldCheck, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BookOpen size={20} />, label: 'Bond Market', path: '/market' },
    { icon: <Briefcase size={20} />, label: 'Portfolio', path: '/portfolio' },
    { icon: <PlusCircle size={20} />, label: 'Issue Bond', path: '/issue' },
    { icon: <RefreshCw size={20} />, label: 'Transactions', path: '/transactions' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <ShieldCheck size={20} />, label: 'Compliance', path: '/compliance' },
    { icon: <FileText size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-30 transition-all duration-300 ease-in-out w-64
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="h-16 bg-[#0033A0] flex items-center justify-between px-4 lg:hidden">
          <span className="text-white text-lg font-semibold">CantonBond</span>
          <button onClick={onClose} className="text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <div className="mb-8">
            <div className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-2">
              Main Navigation
            </div>
            <nav>
              <ul className="space-y-1">
                {menuItems.slice(0, 5).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2 rounded-lg transition-colors duration-150
                        ${isActive(item.path) 
                          ? 'bg-blue-50 text-[#0033A0]' 
                          : 'text-gray-700 hover:bg-gray-100'}
                      `}
                      onClick={onClose}
                    >
                      <span className={isActive(item.path) ? 'text-[#0033A0]' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      <span className="ml-3 font-medium">{item.label}</span>
                      {item.label === 'Issue Bond' && (
                        <span className="ml-auto bg-[#B4975A] text-white text-xs px-1.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div>
            <div className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-2">
              Administrative
            </div>
            <nav>
              <ul className="space-y-1">
                {menuItems.slice(5).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2 rounded-lg transition-colors duration-150
                        ${isActive(item.path) 
                          ? 'bg-blue-50 text-[#0033A0]' 
                          : 'text-gray-700 hover:bg-gray-100'}
                      `}
                      onClick={onClose}
                    >
                      <span className={isActive(item.path) ? 'text-[#0033A0]' : 'text-gray-500'}>
                        {item.icon}
                      </span>
                      <span className="ml-3 font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium mb-1">Canton Network Status</div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-600">All systems operational</span>
            </div>
            <div className="mt-2 text-xs text-blue-600 font-medium cursor-pointer">
              View network details
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;