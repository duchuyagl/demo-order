import React, { useState } from 'react';
import {
  BarChart3,
  FileText,
  Package,
  Receipt,
  Settings,
  Home,
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const [masterMenuOpen, setMasterMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: Home },
    { id: 'quotes', label: '見積管理', icon: FileText },
    { id: 'orders', label: '受注管理', icon: Package },
    { id: 'sales', label: '売上管理', icon: BarChart3 },
    { id: 'billing', label: '請求管理', icon: Receipt },
  ];

  const masterMenuItems = [
    { id: 'customers', label: '顧客マスタ' },
    { id: 'products', label: '商品マスタ' },
    { id: 'users', label: 'ユーザー管理' },
    { id: 'departments', label: '部署マスタ' },
    { id: 'suppliers', label: '仕入先マスタ' },
    { id: 'roles', label: 'ロールマスタ' },
    { id: 'permissions', label: '権限マスタ' },
    { id: 'costs', label: '原価マスタ' },
    { id: 'billing-destinations', label: '請求先マスタ' },
  ];

  return (
    <div className="bg-[#051C2C] text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#0a2a3f]">
        <h1 className="text-xl font-bold">受注管理システム</h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
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

          <li>
            <button
              onClick={() => setMasterMenuOpen(!masterMenuOpen)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                masterMenuItems.some(item => item.id === currentPage)
                  ? 'bg-[#0a2a3f] text-white'
                  : 'text-blue-200 hover:bg-[#0a2a3f] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5" />
                <span>マスタ管理</span>
              </div>
              {masterMenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {masterMenuOpen && (
              <ul className="mt-2 ml-4 space-y-1">
                {masterMenuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => onPageChange(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        currentPage === item.id
                          ? 'bg-[#0a2a3f] text-white'
                          : 'text-blue-200 hover:bg-[#0a2a3f] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
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