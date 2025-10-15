import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Package, 
  Receipt, 
  DollarSign,
  Settings,
  Home,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: Home },
    { id: 'quotes', label: '見積管理', icon: FileText },
    { id: 'orders', label: '受注管理', icon: Package },
    { id: 'sales', label: '売上管理', icon: BarChart3 },
    { id: 'billing', label: '請求管理', icon: Receipt },
    { id: 'master', label: 'マスタ管理', icon: Settings },
  ];

  return (
    <div className="bg-[#051C2C] text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#0a2a3f]">
        <h1 className="text-xl font-bold">受注管理システム</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#0a2a3f] text-white'
                      : 'text-blue-200 hover:bg-[#0a2a3f] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#0a2a3f]">
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-blue-200 hover:bg-[#0a2a3f] hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>ログアウト</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;