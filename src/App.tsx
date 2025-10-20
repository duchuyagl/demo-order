import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QuoteManagement from './components/QuoteManagement';
import OrderManagement from './components/OrderManagement';
import SalesManagement from './components/SalesManagement';
import BillingManagement from './components/BillingManagement';
import AccountMaster from './components/AccountMaster';
import RoleMaster from './components/RoleMaster';
import PermissionMaster from './components/PermissionMaster';
import EmployeeMaster from './components/EmployeeMaster';
import DepartmentMaster from './components/DepartmentMaster';
import ExternalUserMaster from './components/ExternalUserMaster';
import CustomerMaster from './components/CustomerMaster';
import BillingDestinationMaster from './components/BillingDestinationMaster';
import ProductMaster from './components/ProductMaster';
import TaskMaster from './components/TaskMaster';
import OutsourcingMaster from './components/OutsourcingMaster';
import SupplierMaster from './components/SupplierMaster';
import CostMaster from './components/CostMaster';
import { Menu } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'quotes':
        return <QuoteManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'sales':
        return <SalesManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'accounts':
        return <AccountMaster />;
      case 'roles':
        return <RoleMaster />;
      case 'permissions':
        return <PermissionMaster />;
      case 'employees':
        return <EmployeeMaster />;
      case 'departments':
        return <DepartmentMaster />;
      case 'external-users':
        return <ExternalUserMaster />;
      case 'customers':
        return <CustomerMaster />;
      case 'billing-destinations':
        return <BillingDestinationMaster />;
      case 'products':
        return <ProductMaster />;
      case 'tasks':
        return <TaskMaster />;
      case 'outsourcing':
        return <OutsourcingMaster />;
      case 'suppliers':
        return <SupplierMaster />;
      case 'costs':
        return <CostMaster />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebarVisible && (
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        />
      )}
      <main className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-[#051C2C] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;