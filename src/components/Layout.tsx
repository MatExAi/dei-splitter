
import React from 'react';
import { Zap, Activity, History, Info, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'split', label: 'Υπολογισμός', icon: Zap },
    { id: 'history', label: 'Ιστορικό', icon: History },
    { id: 'tariffs', label: 'Tariff Watch', icon: Activity },
    { id: 'about', label: 'Πληροφορίες', icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-dei-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1 rounded">
                <Zap className="h-6 w-6 dei-blue" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">DEI Splitter</span>
                <span className="text-[10px] font-medium uppercase tracking-widest opacity-80">by MatExAi</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dei-blue border-t border-white/10 px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 DEI Splitter — MatExAi Tools</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-dei-blue">Όροι Χρήσης</a>
            <a href="#" className="hover:text-dei-blue">Προστασία Δεδομένων</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
