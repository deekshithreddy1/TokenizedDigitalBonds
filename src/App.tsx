import React from 'react';
import { ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BondMarket from './pages/BondMarket';
import Portfolio from './pages/Portfolio';
import BondDetails from './pages/BondDetails';
import IssueBond from './pages/IssueBond';
import Authentication from './pages/Authentication';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  if (!isLoggedIn) {
    return <Authentication onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-[#0033A0] text-white shadow-md z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-4 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center">
                <span className="text-2xl font-bold tracking-tight">CantonBond</span>
                <span className="ml-2 text-[#B4975A] font-light">|</span>
                <span className="ml-2 text-sm font-light tracking-wide text-gray-200">Enterprise</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="hidden md:flex items-center mr-6">
                <span className="text-sm font-medium">Goldman Sachs</span>
                <ChevronDown size={14} className="ml-1" />
              </div>
              <div className="flex items-center border-l border-blue-700 pl-4">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-2">
                  <User size={16} />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-semibold">Alex Morgan</div>
                  <div className="text-xs text-gray-300">Administrator</div>
                </div>
                <button className="ml-4 text-gray-300 hover:text-white">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/market" element={<BondMarket />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/bonds/:id" element={<BondDetails />} />
                <Route path="/issue" element={<IssueBond />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;