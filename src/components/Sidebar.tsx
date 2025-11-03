import React, { useState } from 'react';
import {
  BarChart3,
  FileText,
  Package,
  Receipt,
  DollarSign,
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

interface SubMenuItem {
  id: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  subItems?: SubMenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const [masterExpanded, setMasterExpanded] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'ダッシュボード', icon: Home },
    { id: 'quotes', label: '見積管理', icon: FileText },
    { id: 'orders', label: '受注管理', icon: Package },
    { id: 'sales', label: '売上管理', icon: BarChart3 },
    { id: 'billing', label: '請求管理', icon: Receipt },
    {
      id: 'master',
      label: 'マスタ管理',
      icon: Settings,
      subItems: [
        { id: 'master-account', label: 'アカウントマスタ' },
        { id: 'master-staff', label: 'スタッフマスタ' },
        { id: 'master-department', label: '部署マスタ' },
        { id: 'master-role', label: 'ロールマスタ' },
        { id: 'master-permission', label: '権限マスタ' },
        { id: 'master-screen', label: '画面マスタ' },
        { id: 'master-customer', label: '顧客マスタ' },
        { id: 'master-billing', label: '請求先マスタ' },
        { id: 'master-shipping', label: '配送先マスタ' },
        { id: 'master-product', label: '商品マスタ' },
        { id: 'master-supplier', label: '仕入先マスタ' },
        { id: 'master-cost', label: '原価マスタ' },
      ]
    },
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
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = item.id === 'master' && masterExpanded;
            const isActive = currentPage === item.id || (hasSubItems && item.subItems?.some(sub => sub.id === currentPage));

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      setMasterExpanded(!masterExpanded);
                    } else {
                      onPageChange(item.id);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#0a2a3f] text-white'
                      : 'text-blue-200 hover:bg-[#0a2a3f] hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {hasSubItems && (
                    isExpanded ?
                      <ChevronDown className="w-4 h-4" /> :
                      <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {hasSubItems && isExpanded && (
                  <ul className="mt-2 ml-4 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => onPageChange(subItem.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                            currentPage === subItem.id
                              ? 'bg-[#0a2a3f] text-white'
                              : 'text-blue-200 hover:bg-[#0a2a3f] hover:text-white'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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